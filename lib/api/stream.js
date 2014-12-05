// Dependencies
var Config = require("../conf")
  , Request = require("request")
  , Couleurs = require("couleurs")
  , Moment = require("moment")
  , ParseXML = require('xml2js').parseString
  ;

// Icons! :-)
var icons = {
    "CreateEvent":        "⊕"
  , "WatchEvent":         "★"
  , "PushEvent":          "─●─"
  , "ForkEvent":          "⑂"
  , "PullRequestEvent":   "⇑"
  , "DeleteEvent":        "⊗"
  , "ReleaseEvent":       "⌗"
  , "IssuesEvent":        "⚠"
};

/**
 * NewsFeed
 * Fetches the latest events from news feed.
 *
 * @name NewsFeed
 * @function
 * @param {Function} callback The callback function.
 * @return {undefined}
 */
module.exports = function (callback) {
    Request.get({
        headers: {
            "user-agent": "GitHub - CLI"
        }
      , auth: {
            username: Config.username
          , password: Config.token
        }
      , url: "https://github.com/" + Config.username + ".private.atom"
    }, function (err, status, body) {
        if (err || body.error) { return callback(err || body.error); }

        // TODO Body is ' '
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
