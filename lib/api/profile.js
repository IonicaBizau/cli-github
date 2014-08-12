var Request = require("request");
module.exports = function (options, callback) {
    // CONFIG._github.user.get({
    //     user: options.username || options
    // }, function (err, user) {
    //     if (err) { return callback(err); }
    //     callback(null, user);
    // });
    // TODO use github library
    Request.get({
        auth: {
            username: CONFIG.username
          , password: CONFIG.password
        }
      , headers: {
            "user-agent": "GitHub - CLI"
        }
      , url: "https://api.github.com/users/" + (options.username || options)
      , json: true
    }, function (err, status, body) {
         if (err || body.error) { return callback(err || body.error); }
         console.log(body);
         callback(null, body);
    });
};
