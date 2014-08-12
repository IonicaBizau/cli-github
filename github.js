#!/usr/bin/env node

var conf = require("./config")
  , Box = require("cli-box")
  , GitHub = new (require("github"))({
        version: "3.0.0"
    })
  , Login = require("./lib/api/login")
  , Keypress = require("keypress")
  , CliUpdate = require("cli-update")
  ;

Keypress(process.stdin);

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
            SplashScreen.updateMessage("Failed to login in: " + JSON.parse(err.message).message);
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
    var handlers = CONFIG.frameHandlers[CONFIG.currentFrame] || {};
    if (key && key.shift && typeof handlers[key.name.toUpperCase()] === "function") {
        handlers[key.name.toUpperCase()]();
    }

    if (key && key.shift && key.name === "left") {
        CONFIG.cli.update.back();
    }

    if (key && key.shift && key.name === "right") {
        CONFIG.cli.update.back();
    }

    if (key && key.name === "c" && key.ctrl) {
        process.exit();
    }
});

try {
process.stdin.setRawMode(true);
process.stdin.resume();
} catch (e) {}
