var Prompt = require("prompt")
  , Profile = require(CONFIG.root + "/lib/ui/profile")
  , Overlap = require("overlap")
  , Box = require("cli-box")
  ;

Prompt.start();
Prompt.message = "";
Prompt.delimiter = "";

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
        var old = CONFIG.cli.update.history.slice(-1)[0];
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
        CONFIG.cli.update.render(newS, false);
    }
};

module.exports = {
    "news-feed": {
        // Create repository
        "C": function () {
            Dialog.show("Waiting for user input ...");
            Prompt.get(schemas.newRepository, function (err, result) {
                Dialog.show("Loading...");
                CONFIG._github.repos.create(result, function (err, data) {
                    if (err) { return Dialog.show("Cannot create repository: " + JSON.parse(err.message).message); }
                    console.log(data);
                    Dialog.show("Repository created at: ");
                });
            });
        }
        // Profile
      , "P": function () {
            Prompt.get({properties: {
                username: {
                    default: CONFIG.username
                  , description: "User:"
                }
            }}, function (err, result) {
                console.log(result);
                Profile(result.username, function () {
                });
            });
        }
        // Show issues
      , "I": function () {

        }
        // Show pull requests
      , "R": function () {

        }
    }
};
