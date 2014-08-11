#!/usr/bin/env node

// Set config
global.CONFIG = {
    root: __dirname
}

// Dependencies
var SplashScreen = require("./lib/splash-screen");

SplashScreen.show();
setTimeout(function() {
    //SplashScreen.hide();
}, 1000);
