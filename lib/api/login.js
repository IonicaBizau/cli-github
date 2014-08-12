var Prompt = require("prompt")
  , Fs = require("fs")
  ;
Prompt.start();
Prompt.message = "";
Prompt.delimiter = "";
Prompt.colors = false;

var schema = {
    properties: {
        username: {
            message: "Invalid username."
          , required: true
          , description: "GitHub Username:"
        },
        password: {
            hidden: true
          , required: true
          , message: "Invalid password."
          , description: "GitHub Password:"
        }
    }
};

module.exports = function login(callback) {
    if (!CONFIG.username || !CONFIG.password) {
        return Prompt.get(schema, function (err, result) {
            if (err) { return callback(err); }
            CONFIG.username = result.username;
            CONFIG.password = result.password;
            login(callback);
        });
        // TODO
    }

    CONFIG._github.authenticate({
        type: "basic",
        username: CONFIG.username,
        password: CONFIG.password
    });

    CONFIG._github.user.get({}, function (err, user) {

        if (err) {
            delete CONFIG.username;
            delete CONFIG.password;
            return callback(err);
        }

        Fs.writeFileSync(CONFIG.root + "/config.json", JSON.stringify({
            username: CONFIG.username
          , password: CONFIG.password
        }));

        callback(null, user);
    });
}
