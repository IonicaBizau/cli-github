// Dependencies
var Config = require("../conf")
  , Table = require("le-table")
  , Overlap = require("overlap")
  , UserList = require("../api/user-list")
  , Utils = require(Config.root + "/lib/utils")
  ;


/**
 * NewsFeed
 * Fetches the news feed and shows the table.
 *
 * @name NewsFeed
 * @function
 * @param {Function} callback The callback function.
 * @return {undefined}
 */
module.exports = function (options, callback) {
    UserList(options, function (err, data) {
        if (err) { return callback(err); }
        Config.currentFrame = "user-list";


        var offsetTop = 10
          , show =  Math.floor((Config.cli.h - offsetTop - 3) / 2) - 1
          , yLimit = show
          , xLimit = Math.floor(Config.cli.w / 32)
          ;

        if (yLimit > data.length) {
            yLimit = data.length;
        }

        var tables = [];
        outer_loop:
        for (var x = 0; x < xLimit; ++x) {
            if (!data[x * yLimit]) {
                break;
            }
            var users = new Table();
            tables.push(users);
            users.addRow(["#", {
                text: "Login"
              , data: {
                    width: 23
                  , hAlign: "center"
                }
            }]);
            for (var y = 0; y < yLimit; ++y) {
                var cUser = data[x * yLimit + y];
                if (!cUser) {
                    break outer_loop;
                }
                users.addRow([{
                    text: x * yLimit + y + 1
                  , data: {
                        width: 6
                    }
                }, {
                    text: "@" + cUser.login
                  , data: {
                        width: 23
                    }
                }]);
            }
        }

        var allTables = tables[0].toString();
        for (var i = 1; i < tables.length; ++i) {
            allTables = Overlap({
                who: allTables
              , with: tables[i].toString()
              , where: {
                    x: i * 29
                  , y: 0
                }
            });
        }

        var output = Overlap({
                who: Config.background.toString()
              , with: allTables
              , where: {
                    x: Config.cli.w / 2 - allTables.split("\n")[0].length / 2
                  , y: 10
                }
            })
          , desc = {
                followers: "@" + options.user + "'s followers"
              , following: "@" + options.user + "'s following"
              , members: "@" + options.user + "'s members"
            }
          ;

        output = Utils.overlap(output, [
            Config.title
          , " - - - "
          , Config.description
          , ""
          , "-----------------------------------------------------------------"
          , desc[options.type]
          , "-----------------------------------------------------------------"
        ], 2, "center");
        Config.cli.update.render(output.trim(), true, {
            currentFrame: Config.currentFrame
        });
    });
};
