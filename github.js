#!/usr/bin/env node

var conf = require("./config");

// Set config
global.CONFIG = {
    root: __dirname
  , cli: {
        w: process.stdout.columns || 212
      , h: process.stdout.rows || 56
    }
}

for (var key in conf) {
    CONFIG[key] = conf[key];
}

// Dependencies
var SplashScreen = require("./lib/splash-screen")
  , MainStream = require("./lib/stream")
  ;

//SplashScreen.show();
//setTimeout(function() {
//    //SplashScreen.hide();
//}, 1000);
