var Request = require("request")
  , Couleurs = require("couleurs")
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
};

module.exports = function (callback) {
    Request.get({
        auth: {
            username: CONFIG.username
          , password: CONFIG.password
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
            });
        }

        callback(null, streamData);
    });
};
