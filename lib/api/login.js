// Dependencies
var Fs = require("fs");

// Login schema
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

/**
 * Login
 * Asks the user for username and password. Then authenticates the user.
 *
 * @name Login
 * @function
 * @param {Function} callback The callback function.
 * @return {undefined}
 */
var login = module.exports = function (callback) {

    if (!CONFIG.username || !CONFIG.password) {
        return CONFIG.prompt.get(schema, function (err, result) {
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

        Fs.writeFileSync(CONFIG.CONFIG_PATH, JSON.stringify({
            username: CONFIG.username
          , password: CONFIG.password
        }));

        callback(null, user);
    });
}
