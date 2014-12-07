// Dependencies
var Config = require("../conf")
  , ImageToAscii = require("image-to-ascii")
  , Overlap = require("overlap")
  , Utils = require(Config.root + "/lib/utils")
  ;

/**
 * SplashScreen.show
 * Shows the splash screen.
 *
 * @name SplashScreen.show
 * @function
 * @param {Function} callback The callback function.
 * @return {undefined}
 */
var bOut = null;
exports.show = function(callback) {

    Config.currentFrame = "splashscreen";
    ImageToAscii({
        size: {
            height: "25%"
          , width: "40%"
        }
      , pxWidth: 1
      , reverse: true
      , colored: false
      , path: Config.root + "/resources/github.png"
    }, function(err, cGithub) {
        if (err) { callback(err); }

        ImageToAscii({
            size: {
                width: 36
              , height: 18
            }
          , path: Config.root + "/resources/octocat.png"
          , colored: false
          , pixels: "@O!. "
          , pxWidth: 1
        }, function(err, cOctocat) {
            if (err) { callback(err); }
            var output = Overlap({
                who: Config.background.toString()
              , with: cGithub
              , where: {
                    x: Config.cli.w / 2 - cGithub.split("\n")[0].length / 2
                  , y: Config.cli.h - cGithub.split("\n").length - 4
                }
            });
            bOut = output = Overlap({
                who: output
              , with: cOctocat
              , where: {
                    x: Config.cli.w / 2 - cOctocat.split("\n")[0].length / 2
                  , y: Config.cli.h - cGithub.split("\n").length - cGithub.split("\n").length - 10
                }
            }).trim();
            Config.cli.update.render(output, true, {
                currentFrame: Config.currentFrame
            });
            callback(null, output);
        });
    });
};

/**
 * SplashScreen.updateMessage
 * Updates the splash screen message.
 *
 * @name SplashScreen
 * @function
 * @param {String} message The message to show.
 * @return {undefined}
 */
exports.updateMessage = function (message) {
    Config.cli.update.render(Utils.overlap(bOut, message, bOut.split("\n").length - 2, "center").trim(), false);
};
