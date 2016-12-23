var Config = require("./conf")
  , Profile = require(Config.root + "/lib/ui/profile")
  , Overlap = require("overlap")
  , Keypress = require("keypress")
  , Box = require("cli-box")
  ;

var Handlers = module.exports = {};

var Dialog = {
    show: function (message) {
        var old = Config.cache._currentScreen;
        if (!message) {
            return Config.cli.update.render("\n" + old, false, {}, false);
        }

        var box = Box({
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
        });

        var newS = Overlap({
            who: old
          , with: box
          , where: {
                x: Math.floor(old.split("\n")[0].length / 2 - box.split("\n")[0].length / 2 - 1)
              , y: Math.floor(old.split("\n").length / 2 - box.split("\n").length / 2)
            }
        }).trim();
        Config.cli.update.render(newS, false, {}, false);
    }
};


Handlers["news-feed"] = {
    // Create repository
    "C": function () {
        Dialog.show("Waiting for user input ...");
        Config.promptRunning = true;
        var result = {};
        while (!(result.name = Config.prompt("Repository name"))) {}
        result.description = Config.prompt("Repository description (optional)");
        result.homepage = Config.prompt("Repository homepage (optional)");
        while (true) {
            result.private = Config.prompt("Private repository (y/N)");

            if (!result.private || result.private.toLowerCase() === "n") {
                result.private = false;
                break;
            }

            if (result.private.toLowerCase() === "y") {
                result.private = true;
                break;
            }
        }

        Config.promptRunning = false;
        if (!result) { return Dialog.show(); }
        Dialog.show("Loading...");
        Config._github.repos.create(result, function (err, data) {
            if (err) { return Dialog.show("Cannot create repository: " + JSON.parse(err.message).message); }
            Dialog.show("Repository created at: " + data.ssh_url);
        });
    }
    // Profile
  , "P": function () {
        Dialog.show("Waiting for user input ...");
        Config.promptRunning = true;
        var username = Config.prompt("Username");
        Config.promptRunning = false;
        if (!username) { return Dialog.show(); }
        Dialog.show("Loading...");
        Profile(username, function (err, progressMsg) {
            Dialog.show(err || progressMsg);
        }, function (err) {
            if (err) {
                return Dialog.show(err.message);
            }
        });
    }
    // Show issues
  , "I": function () {
        Dialog.show("Fetching issues...");
        require("./ui/user-issues")({
            type: "issues"
          , ops: {
                sort: "updated"
              , q: "is:open is:issue assignee:" + Config.username
            }
        }, function (msg) {
            Dialog.show(msg);
        });
    }
    // Show pull requests
  , "R": function () {
        Dialog.show("Fetching pull requests...");
        require("./ui/user-issues")({
            type: "pullrequests"
          , ops: {
                filter: "created"
              , sort: "updated"
              , state: "open"
            }
          , ops: {
                sort: "updated"
              , q: "is:open is:pr author:" + Config.username
            }
        }, function (msg) {
            Dialog.show(msg);
        });
    }
};

Handlers["profile"] = {
    // Show followers
    "R": function () {
        if (Config.cFrameData.type !== "User") { return; }
        Dialog.show("Fetching followers...");
        require("./ui/user-list")({
            type: "followers"
          , user: Config.cFrameData.login
        }, function (msg) {
            Dialog.show(msg);
        });
    }

    // Show following
  , "N": function () {
        if (Config.cFrameData.type !== "User") { return; }
        Dialog.show("Fetching following...");
        require("./ui/user-list")({
            type: "following"
          , user: Config.cFrameData.login
        }, function (msg) {
            Dialog.show(msg);
        });
    }

    // Show members
  , "M": function () {
        if (Config.cFrameData.type !== "Organization") { return; }
        Dialog.show("Fetching members...");
        require("./ui/user-list")({
            type: "members"
          , user: Config.cFrameData.login
        }, function (msg) {
            Dialog.show(msg);
        });
    }
};

Handlers["user-list"] = {
    "P": Handlers["news-feed"].P
};
