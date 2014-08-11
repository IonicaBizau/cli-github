#!/usr/bin/env node

// Set config
global.CONFIG = {
    root: __dirname
  , cli: {
        w: process.stdout.columns || 212
      , h: process.stdout.rows || 56
    }
}

// Dependencies
var SplashScreen = require("./lib/splash-screen");

SplashScreen.show();
setTimeout(function() {
    //SplashScreen.hide();
}, 1000);
