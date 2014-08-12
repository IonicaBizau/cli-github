var Table = require("le-table")
  , Couleurs = require("couleurs")
  , Overlap = require("overlap")
  , Stream = require("../api/stream")
  , Utils = require(CONFIG.root + "/lib/utils")
  ;

// Set default marks
Table.defaults.marks = {
    nw: "┌"
  , n:  "─"
  , ne: "┐"
  , e:  "│"
  , se: "┘"
  , s:  "─"
  , sw: "└"
  , w:  "│"
  , b: " "
  , mt: "┬"
  , ml: "├"
  , mr: "┤"
  , mb: "┴"
  , mm: "┼"
};

module.exports = function (callback) {
    Stream(function (err, data) {
        if (err) { return callback(err); }

        var timeline = new Table();
        timeline.addRow(["#", {
            text: "Type"
          , data: {
                width: 8
              , hAlign: "center"
            }
        }, "Description"]);

        var offsetTop = 10
          , show =  Math.floor((CONFIG.cli.h - offsetTop - 3) / 2) - 1
          ;

        if (show > data.length) {
            show = data.length;
        }

        for (var i = 0; i < show; ++i) {
            var cEv = data[i];

            timeline.addRow([{
                text: i + 1
              , data: {
                    vAlign: "middle"
                  , width: 6
                }
            }, {
                text: cEv.icon
              , data: {
                    hAlign: "center"
                  , vAlign: "middle"
                }
            }, {
                text: cEv.description
              , data: {
                    vAlign: "middle"
                }
            }]);
        }

        var cTimeline = timeline.toString()
          , output = Overlap({
                who: CONFIG.background.toString()
              , with: cTimeline
              , where: {
                    x: CONFIG.cli.w / 2 - cTimeline.split("\n")[0].length / 2
                  , y: 10
                }
            })
          ;

        output = Utils.overlapCenter(output, [
            "GitHub client for Command Line Interface"
          , " - - - "
          , "</> with <3 by @IonicaBizau"
        ], 2);
        console.log(output.trim());
    });
};
