var ImageToAscii = require("image-to-ascii")
  , Overlap = require("overlap")
  , Utils = require(CONFIG.root + "/lib/utils")
  ;

var bOut = null;
exports.show = function(callback) {

    CONFIG.currentFrame = "splashscreen";
    var github = new ImageToAscii({
            resize: {
                height: "25%"
              , width: "40%"
            }
          , multiplyWidth: 1
          , reverse: true
        })
      , octocat = new ImageToAscii({
            resize: {
                height: "25%"
            }
          , reverse: true
        })
      ;

    github.convert(CONFIG.root + "/resources/github.png", function(err, cGithub) {
        if (err) { callback(err); }
        octocat.convert(CONFIG.root + "/resources/octocat.png", function(err, cOctocat) {
            if (err) { callback(err); }
            var output = Overlap({
                who: CONFIG.background.toString()
              , with: cGithub
              , where: {
                    x: CONFIG.cli.w / 2 - cGithub.split("\n")[0].length / 2
                  , y: CONFIG.cli.h - cGithub.split("\n").length - 4
                }
            });
            bOut = output = Overlap({
                who: output
              , with: cOctocat
              , where: {
                    x: CONFIG.cli.w / 2 - cOctocat.split("\n")[0].length / 2
                  , y: CONFIG.cli.h - cGithub.split("\n").length - cGithub.split("\n").length - 10
                }
            }).trim();
            console.log(output);
            callback(null, output);
        });
    });
};

exports.updateMessage = function (message) {
    console.log(Utils.overlap(bOut, message, bOut.split("\n").length - 2, "center").trim());
}
