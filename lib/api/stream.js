// Dependencies
var Request = require("request")
  , Couleurs = require("couleurs")
  , Moment = require("moment")
  ;

// Icons! :-)
var icons = {
    "CreateEvent":      "⊕"
  , "WatchEvent":       "★"
  , "PushEvent":        "─●─"
  , "ForkEvent":        "⑂"
  , "PullRequestEvent": "⇑"
  , "DeleteEvent":      "⊗"
  , "ReleaseEvent":     "⌗"
  , "IssuesEvent":      "⚠"
};

// Event descriptions
var createDescription = function (event) {
  var msg = "";

  var actor = event.actor;
  var repo = event.repo;
  var payload = event.payload
  switch (event.type) {
    case "CreateEvent":
      msg = actor.login + " created " + repo.name;
      break;
    case "WatchEvent":
      msg = actor.login + " starred " + repo.name;
      break;
    case "PushEvent":
      msg = actor.login + " pushed to " + payload.ref.replace("refs/heads/", "") + " at " + repo.name;
      break;
    case "ForkEvent":
      msg = actor.login + " forked " + repo.name + " to " + payload.forkee.full_name;
      break;
    case "PullRequestEvent":
      msg = actor.login + " " + payload.action + " pull request " + repo.name + "#" + payload.number;
      break;
    case "DeleteEvent":
      msg = actor.login + " deleted " + payload.ref_type + " " + payload.ref + " at " + repo.name;
      break;
    case "ReleaseEvent":
      msg = actor.login + " published " + repo.name + " " + payload.release.tag_name;
      break;
    case "IssuesEvent":
      msg = actor.login + " " + payload.action + " issue " + repo.name + "#" + payload.issue.number;
      break;
  }

    return msg;
}

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
          , "Authorization": "token " + CONFIG.token
        }
      , url: "https://api.github.com/users/" + CONFIG.username + "/received_events"
    }, function (err, status, body) {
        if (err || body.error) { return callback(err || body.error); }

        var streamData = [];
        var events = JSON.parse(body);
        for (var i = 0; i < events.length; ++i) {
          var cEv = events[i];

          streamData.push({
              icon: icons[cEv.type] || " "
            , description: createDescription(cEv)
            , time: Moment(cEv.created_at).fromNow()
          });
        }

        callback(null, streamData);
    });
};
