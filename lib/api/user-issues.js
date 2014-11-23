var Request = require("request");

module.exports = function (callback) {
    Request.get({
        auth: {
            username: CONFIG.username
          , password: CONFIG.password
        }
      , headers: {
            "user-agent": "GitHub - CLI"
        }
      , url: "https://api.github.com/issues?filter=assigned&sort=updated"
      , json: true
    }, function (err, status, body) {
        if (err || body.error) { return callback(err || body.error); }
        callback(null, body);
    });
};
