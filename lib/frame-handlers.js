var Profile = require(CONFIG.root + "/lib/ui/profile")
  , Overlap = require("overlap")
  , Keypress = require("keypress")
  , Box = require("cli-box")
  ;

var schemas = {
    newRepository: {
        properties: {
            name: {
                message: "Invalid repository name."
              , required: true
              , description: "Repository name:"
            }
          , description: {
                message: "Invalid repository description."
              , description: "Repository description (optional):"
            }
          , homepage: {
                message: "Invalid homepage."
              , description: "Repository homepage (optional):"
            }
          , private: {
                description: "Private repository (false):"
              , validator: /true|false/
              , warning: "Must respond true or false"
              , default: "false"
              , type: "boolean"
            }
        }
    }
};

var Dialog = {
    show: function (message) {
        var old = CONFIG.cache._currentScreen;
        if (!message) {
            return CONFIG.cli.update.render("\n" + old, false, {}, false);
        }

        var box = (new Box({
            w: 50
          , h: 5
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
        }, {
            text: message
          , stretch: true
          , autoEOL: true
          , hAlign: "center"
          , vAlign: "middle"
        })).toString()

        var newS = Overlap({
            who: old
          , with: box
          , where: {
                x: Math.floor(old.split("\n")[0].length / 2 - box.split("\n")[0].length / 2 - 1)
              , y: Math.floor(old.split("\n").length / 2 - box.split("\n").length / 2)
            }
        }).trim();
        CONFIG.cli.update.render(newS, false, {}, false);
    }
};

module.exports = {
    "news-feed": {
        // Create repository
        "C": function () {
            Dialog.show("Waiting for user input ...");
            CONFIG.promptRunning = true;
            CONFIG.prompt.get(schemas.newRepository, function (err, result) {
                CONFIG.promptRunning = false;
                if (!result) { return Dialog.show(); }
                Dialog.show("Loading...");
                CONFIG._github.repos.create(result, function (err, data) {
                    if (err) { return Dialog.show("Cannot create repository: " + JSON.parse(err.message).message); }
                    Dialog.show("Repository created at: " + data.ssh_url);
                });
            });
        }
        // Profile
      , "P": function () {
            Dialog.show("Waiting for user input ...");
            CONFIG.promptRunning = true;
            CONFIG.prompt.get({properties: {
                username: {
                    default: CONFIG.username
                  , description: "User:"
                }
            }}, function (err, result) {
                CONFIG.promptRunning = false;
                if (!result) { return Dialog.show(); }
                Dialog.show("Loading...");
                Profile(result.username, function (err, progressMsg) {
                    Dialog.show(err || progressMsg);
                }, function (err) {
                    if (err) {
                        return Dialog.show(err.message);
                    }
                });
            });
        }
        // Show issues
      , "I": function () {
            Dialog.show("Fetching issues...");
            require("./ui/user-issues")(function (err, issues) {
            });
        }
        // Show pull requests
      , "R": function () {

        }
    }
};
