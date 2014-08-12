#!/usr/bin/env node

var conf = require("./config")
  , Box = require("cli-box")
  ;

// Set config
global.CONFIG = {
    root: __dirname
  , cli: {
        w: process.stdout.columns || 212
      , h: process.stdout.rows || 56
    }
};
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


SplashScreen.show();
setTimeout(function() {
    MainStream();
}, 1000);
