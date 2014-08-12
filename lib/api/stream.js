var Request = require("request")
  , Couleurs = require("couleurs")
  ;

String.prototype.bold = function () {
    return this;
};

var handlers = {
    "CreateEvent": {
        icon: "⊕"
      , message: function (cEv) {
            return cEv.actor.rgb(255, 0, 0) + " created repository " + cEv.url.replace("https://github.com/", "").bold();
        }
    }
  , "WatchEvent": {
        icon: "★"
      , message: function (cEv) {
            return cEv.actor.bold() + " starred repository " + cEv.url.replace("https://github.com/", "").bold();
        }
    }
  , "PushEvent": {
        icon: "─●─"
      , message: function (cEv) {
            return cEv.actor.bold() + " pushed to " + cEv.payload.ref.replace("refs/heads/", "") + " at " + cEv.repository.url.replace("https://github.com/", "").bold();
        }
    }
};

module.exports = function (callback) {
    Request.get({
        auth: {
            username: "IonicaBizau"
          , password: CONFIG.access_token
        }
      , url: "https://github.com/IonicaBizau.private.json"
      , json: true
    }, function (err, status, body) {
        if (err) { return callback(err); }
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
