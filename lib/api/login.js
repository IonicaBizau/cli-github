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

// 2FA OTP Scheme
var otpScheme = {
    properties: {
        otp: {
            required: true
          , message: "Invalid 2FA authentication code."
          , description: "2FA Authentication Code:"  
          , type: "number"
        }
    }
}

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
    if (!CONFIG.username) {
        return CONFIG.prompt.get(schema, function (err, result) {
            if (err) { return callback(err); }
            CONFIG.username = result.username;
            CONFIG.password = result.password;
            login(callback);
        });
        // TODO
    }

    if (CONFIG.token) {
        CONFIG._github.authenticate({
            type: "oauth",
            token: CONFIG.token
        });
    } else {
        CONFIG._github.authenticate({
            type: "basic",
            username: CONFIG.username,
            password: CONFIG.password
        });

        var opts = {
            note: "CLI GitHub",
            note_url: "https://github.com/IonicaBizau/cli-github"
        }

        if (CONFIG.otp) {
            opts.headers = {
                "X-GitHub-OTP": CONFIG.otp
            }
        }

        return CONFIG._github.authorization.getAll({
            headers: (opts.headers ? opts.headers : {})
        }, function (err, res) {
            if (err) {
                var error;
                try {
                    error = JSON.parse(err.message).message;
                } catch (e) {
                    error = err.toString();
                }

                if (error.indexOf("Must specify two-factor authentication OTP code.") !== -1 && !CONFIG.otp) {
                    return CONFIG.prompt.get(otpScheme, function (err, result) {
                        if (err) { return callback(err); }
                        CONFIG.otp = result.otp;
                        login(callback);
                    });
                } else {
                    return callback(err);
                }
            }

            var cliAuth;
            for (var i = 0; i < res.length; ++i) {
                var auth = res[i];

                if (auth.note === "CLI GitHub") {
                    cliAuth = auth;
                    break;
                } else {
                    continue;
                }
            }

            if (typeof cliAuth !== "undefined") {
                CONFIG.token = cliAuth.token;
                login(callback);
            } else {
                CONFIG._github.authorization.create(opts, function (err, res) {
                    if (err) return callback(err);

                    CONFIG.token = res.token;
                    login(callback);
                });
            }
        });
    }

    CONFIG._github.user.get({}, function (err, user) {
        if (err) {
            delete CONFIG.username;
            delete CONFIG.password;
            delete CONFIG.otp;
            delete CONFIG.token;
            return callback(err);
        }

        Fs.writeFileSync(CONFIG.CONFIG_PATH, JSON.stringify({
            username: CONFIG.username
          , token: CONFIG.token
        }));

        callback(null, user);
    });
}
