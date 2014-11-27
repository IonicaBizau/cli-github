// Dependencies
var Config = require("../conf")
  , Request = require("request")
  ;

/**
 * Profile
 * Gets user profile data.
 *
 * @name Profile
 * @function
 * @param {Object} options Options object
 * @param {Function} progress The progress function.
 * @param {Function} callback The callback function.
 * @return {undefined}
 */
module.exports = function (options, progress, callback) {
    // Config._github.user.get({
    //     user: options.username || options
    // }, function (err, user) {
    //     if (err) { return callback(err); }
    //     callback(null, user);
    // });
    // TODO use github library
    var user = options.username || options;
    Request.get({
        headers: {
            "user-agent": "GitHub - CLI"
          , "Authorization": "token " + Config.token
        }
      , url: "https://api.github.com/users/" + user
      , json: true
    }, function (err, status, body) {
        if (err || body.error) { return callback(err || body.error); }
        progress(null, "Fetching repositories ...");
        Config._github.repos.getFromUser({
            user: user
          , sort: "updated"
        }, function (err, repos) {
            if (err) { return callback(err); }
            body.repos = repos;
            progress(null, "Fetching organizations ...");
            Config._github.orgs.getFromUser({
                user: user
            }, function (err, orgs) {
                if (err) { return callback(err); }
                body.orgs = orgs;
                callback(null, body);
            });
        });
    });
};
