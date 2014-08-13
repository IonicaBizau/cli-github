#!/usr/bin/env node

var Box = require("cli-box")
  , GitHub = new (require("github"))({
        version: "3.0.0"
    })
  , Login = require("./lib/api/login")
  , Keypress = require("keypress")
  , CliUpdate = require("cli-update")
  , Prompt = require("prompt")
  ;

Prompt.start();
Prompt.message = "";
Prompt.delimiter = "";
Prompt.colors = false;

var oldGet = Prompt.get;
Prompt.get = function (schema, callback) {
    oldGet.call(this, schema, function () {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        callback.apply(this, arguments);
    });
};

Keypress(process.stdin);
CliUpdate.navigation = function (data) {
    data && data.currentFrame && (CONFIG.currentFrame = data.currentFrame);
};

CliUpdate.changed = function (output) {
    CONFIG.cache._currentScreen = output;
};

const HOME_DIRECTORY = process.env[
    process.platform == "win32" ? "USERPROFILE" : "HOME"
];

// Set config
global.CONFIG = {
    root: __dirname
  , cli: {
        w: process.stdout.columns || 212
      , h: process.stdout.rows || 56
      , update: CliUpdate
    }
  , _github: GitHub
  , cache: {
        avatars: {}
    }
  , promptRunning: false
  , prompt: Prompt
  , HOMDE_DIR: HOME_DIRECTORY
  , CONFIG_PATH: HOME_DIRECTORY + "/.github-config"
};
CONFIG.frameHandlers = require("./lib/frame-handlers");
CONFIG.background = new Box({
    w: CONFIG.cli.w
  , h: CONFIG.cli.h - 3
  , marks: {
        nw: "╔"
      , n:  "═"
      , ne: "╗"
      , e:  "║"
      , se: "╝"
      , s:  "═"
      , sw: "╚"
      , w:  "║"
      , b: " "
    }
});

try {
var conf = require(CONFIG.CONFIG_PATH);
} catch (e) {
    conf = {};
}
for (var key in conf) {
    CONFIG[key] = conf[key];
}

// Dependencies
var SplashScreen = require("./lib/ui/splash-screen")
  , MainStream = require("./lib/ui/stream")
  ;

SplashScreen.show(function (err, output) {
    if (err) { throw err; }
    SplashScreen.updateMessage("Logging in ...");
    Login(function (err, user) {
        if (err) {
            try {
                var error = JSON.parse(err.message).message;
            } catch (e) {
                error = err.toString();
            }
            SplashScreen.updateMessage("Failed to login in: " + error);
            return setTimeout(function () {
                process.exit();
            }, 1000);
        }
        CONFIG.user = user;
        SplashScreen.updateMessage("Logged in as: " + user.login);
        setTimeout(function() {
            SplashScreen.updateMessage("Fetching News Feed ...");
            MainStream();
        }, 1000);
    });
});

// listen for the "keypress" event
process.stdin.on("keypress", function (ch, key) {
    if (CONFIG.promptRunning) {
        return;
    }
    if (key && key.name === "c" && key.ctrl) {
        process.exit();
    }
    var handlers = CONFIG.frameHandlers[CONFIG.currentFrame] || {};
    if (key && key.shift && typeof handlers[key.name.toUpperCase()] === "function") {
        handlers[key.name.toUpperCase()]();
    }

    if (key && key.shift && key.name === "left") {
        CONFIG.cli.update.back();
    }

    if (key && key.shift && key.name === "right") {
        CONFIG.cli.update.next();
    }
});

try {
process.stdin.setRawMode(true);
process.stdin.resume();
} catch (e) {}
