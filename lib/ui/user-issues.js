// Dependencies
var Table = require("le-table")
  , ImageToAscii = require("image-to-ascii")
  , Overlap = require("overlap")
  , UserIssues = require("../api/user-issues")
  , Utils = require(CONFIG.root + "/lib/utils")
  ;

/**
 * UserIssues
 * Shows the user issues.
 *
 * @name UserIssues
 * @function
 * @param {Object} options The options object.
 * @param {Function} progress The progress function.
 * @param {Function} callback The callback function.
 * @return {undefined}
 */
module.exports = function (options, progress, callback) {
    callback = callback || function () { };
    UserIssues(options, progress, function (err, data) {
        if (err) { return callback(err); }
        CONFIG.currentFrame = "user-issues";

        var userIssues = new Table();
        userIssues.addRow(["#", {
            text: "Repo"
          , data: {
                hAlign: "center"
            }
        }, "Title", {
            text: "Comments"
          , data: {
                width: 10
            }
        }]);

        var offsetTop = 10
          , show =  Math.floor((CONFIG.cli.h - offsetTop - 3) / 2) - 1
          ;

        if (show > data.length) {
            show = data.length;
        }

        for (var i = 0; i < show; ++i) {
            var cEv = data[i];

            userIssues.addRow([{
                text: i + 1
              , data: {
                    vAlign: "middle"
                  , width: 6
                }
            }, {
                text: cEv.url.match(/\/repos\/(.*)\/(.*)\/.*/)[1]
              , data: {
                    hAlign: "center"
                  , vAlign: "middle"
                }
            }, cEv.title
            , {
                text: cEv.comments.toString()
              , data: {
                    width: 10
              }
            }]);
        }

        var cuserIssues = userIssues.toString()
          , output = Overlap({
                who: CONFIG.background.toString()
              , with: cuserIssues
              , where: {
                    x: CONFIG.cli.w / 2 - cuserIssues.split("\n")[0].length / 2
                  , y: 10
                }
            })
          ;



        output = Utils.overlap(output, [
            "GitHub client for Command Line Interface"
          , " - - - "
          , "</> with <3 by @IonicaBizau"
          , ""
          , "-----------------------------------------------------------------"
          , ["Issues assigned to you.", "Pull requests created by you"][({"issues": 0, "pullrequests": 1})[options.type]] + "(@" + CONFIG.username + ")"
          , "-----------------------------------------------------------------"
        ], 2, "center");

        CONFIG.cli.update.render(output.trim(), true, {
            currentFrame: CONFIG.currentFrame
        });
    });
};
