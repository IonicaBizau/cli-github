var ImageToAscii = require("image-to-ascii")
  , Overlap = require("overlap")
  ;

exports.show = function() {
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
        if (err) { throw err; }
        octocat.convert(CONFIG.root + "/resources/octocat.png", function(err, cOctocat) {
            if (err) { throw err; }
            var output = Overlap({
                who: CONFIG.background.toString()
              , with: cGithub
              , where: {
                    x: CONFIG.cli.w / 2 - cGithub.split("\n")[0].length / 2
                  , y: CONFIG.cli.h - cGithub.split("\n").length - 4
                }
            });
            output = Overlap({
                who: output
              , with: cOctocat
              , where: {
                    x: CONFIG.cli.w / 2 - cOctocat.split("\n")[0].length / 2
                  , y: CONFIG.cli.h - cGithub.split("\n").length - cGithub.split("\n").length - 10
                }
            });
            console.log(output.trim());
        });
    });
};
