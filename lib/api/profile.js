var Request = require("request");
module.exports = function (options, progress, callback) {
    // CONFIG._github.user.get({
    //     user: options.username || options
    // }, function (err, user) {
    //     if (err) { return callback(err); }
    //     callback(null, user);
    // });
    // TODO use github library
    var user = options.username || options;
    Request.get({
        auth: {
            username: CONFIG.username
          , password: CONFIG.password
        }
      , headers: {
            "user-agent": "GitHub - CLI"
        }
      , url: "https://api.github.com/users/" + user
      , json: true
    }, function (err, status, body) {
        if (err || body.error) { return callback(err || body.error); }
        progress(null, "Fetching repositories ...");
        CONFIG._github.repos.getFromUser({
            user: user
          , sort: "updated"
        }, function (err, repos) {
            if (err) { return callback(err); }
            body.repos = repos;
            progress(null, "Fetching organizations ...");
            CONFIG._github.orgs.getFromUser({
                user: user
            }, function (err, orgs) {
                if (err) { return callback(err); }
                body.orgs = orgs;
                callback(null, body);
            });
        });
    });
};
