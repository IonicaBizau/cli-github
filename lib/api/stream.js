var Request = require("request")
  , Couleurs = require("couleurs")
  , Moment = require("moment")
  ;

var handlers = {
    "CreateEvent": {
        icon: "⊕"
      , message: function (cEv) {
            return cEv.actor + " created repository " + cEv.url.replace("https://github.com/", "");
        }
    }
  , "WatchEvent": {
        icon: "★"
      , message: function (cEv) {
            return cEv.actor + " starred repository " + cEv.url.replace("https://github.com/", "");
        }
    }
  , "PushEvent": {
        icon: "─●─"
      , message: function (cEv) {
            return cEv.actor + " pushed to " + cEv.payload.ref.replace("refs/heads/", "") + " at " + cEv.repository.url.replace("https://github.com/", "");
        }
    }
  , "ForkEvent": {
        icon: "⑂"
      , message: function (cEv) {
            return cEv.actor + " forked " + cEv.url.replace("https://github.com/", "") + " to " + cEv.repository.url.replace("https://github.com/", "");
        }
    }
  , "PullRequestEvent": {
        icon: "⇑"
      , message: function (cEv) {
            return cEv.actor + " merged pull request " + cEv.url.replace("https://github.com/", "");
        }
    }
  , "DeleteEvent": {
        icon: "⊗"
      , message: function (cEv) {
            return cEv.actor + " deleted " + cEv.payload.ref_type + " " + cEv.payload.ref + " at " + cEv.repository.url.replace("https://github.com/", "");
        }
    }
  , "ReleaseEvent": {
        icon: "⌗"
      , message: function (cEv) {
            return cEv.actor + " released " + cEv.payload.release.name + " at " + cEv.repository.url.replace("https://github.com/", "");
        }
    }
  , "IssueEvent": {
        icon: "⚠"
      , message: function (cEv) {
            return cEv.actor + " deleted release " + cEv.url.replace("https://github.com/", "");
        }
    }
};

module.exports = function (callback) {
    Request.get({
        auth: {
            username: CONFIG.username
          , password: CONFIG.password
        }
      , headers: {
            "user-agent": "GitHub - CLI"
        }
      , url: "https://github.com/IonicaBizau.private.json"
      , json: true
    }, function (err, status, body) {
        if (err || body.error) { return callback(err || body.error); }
        var streamData = [];

        for (var i = 0; i < body.length; ++i) {
            var cEv = body[i]
              , handler = handlers[cEv.type]
              ;

            if (!handler) {
                debugger
                continue;
            }

            streamData.push({
                icon: handler.icon
              , description: handler.message(cEv)
              , time: Moment(cEv.created_at).fromNow()
            });
        }

        callback(null, streamData);
    });
};
