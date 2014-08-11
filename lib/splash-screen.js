var ImageToAscii = require("image-to-ascii")
  , Overlap = require("overlap")
  , Box = require("cli-box")
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
      , background = new Box({
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
        })
      ;

    github.convert(CONFIG.root + "/resources/github.png", function(err, cGithub) {
        if (err) { throw err; }
        octocat.convert(CONFIG.root + "/resources/octocat.png", function(err, cOctocat) {
            if (err) { throw err; }
            var output = Overlap({
                who: background.toString()
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
