var Request = require("request")
  , Couleurs = require("couleurs")
  , Moment = require("moment")
  , ParseXML = require('xml2js').parseString
  ;

var icons = {
    "CreateEvent":      "⊕"
  , "WatchEvent":       "★"
  , "PushEvent":        "─●─"
  , "ForkEvent":        "⑂"
  , "PullRequestEvent": "⇑"
  , "DeleteEvent":      "⊗"
  , "ReleaseEvent":     "⌗"
  , "IssueEvent":       "⚠"
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
      , url: "https://github.com/IonicaBizau.private.atom"
    }, function (err, status, body) {
        if (err || body.error) { return callback(err || body.error); }

        ParseXML(body, function (err, result) {
            if (err) { return callback(err); }
            var streamData = [];

            for (var i = 0; i < result.feed.entry.length; ++i) {
                var cEv = result.feed.entry[i];

                streamData.push({
                    icon: icons[cEv.id[0].split(/:|\//)[2]] || " "
                  , description: cEv.title[0]._
                  , time: Moment(cEv.updated[0]).fromNow()
                });
            }

            callback(null, streamData);
        });
    });
};
