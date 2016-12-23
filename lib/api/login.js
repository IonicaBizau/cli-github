// Dependencies
var Config = require("../conf")
  , Fs = require("fs")
  , idy = require("idy")
  ;

// 2FA OTP Scheme
var otpScheme = {
    properties: {
        otp: {
            required: true
          , message: "Invalid 2FA authentication code."
          , description: ""
          , type: "number"
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

    if (!Config.username) {
        Config.username = Config.prompt("Enter your GitHub username");
        Config.password = Config.prompt("Enter your GitHub password", { char: "*" });
        return login(callback);
    }

    if (Config.token) {
        Config._github.authenticate({
            type: "oauth"
          , token: Config.token
        });
    } else {
        if (!Config.username || !Config.password) {
            Config.username = null;
            Config.password = null;
            return login(callback);
        }

        Config._github.authenticate({
            type: "basic"
          , username: Config.username
          , password: Config.password
        });

        var opts = {
            note: "CLI GitHub :: " + idy()
          , note_url: "https://github.com/IonicaBizau/cli-github"
          , scopes: [
                "user", "public_repo", "repo"
              , "repo_deployment", "repo:status"
              , "delete_repo", "notifications"
              , "read:org", "write:org", "admin:org"
            ]
        };

        if (Config.otp) {
            opts.headers = {
                "X-GitHub-OTP": Config.otp
            };
        }

        // Create the authorization
        return Config._github.authorization.create(opts, function (err, res) {

            if (Config.otp && err) {
                return console.log(err);
            }
            // Handle successfull creation
            if (!err) {
                Config.token = res.token;
                if (JSON.stringify(res.scopes) !== JSON.stringify(opts.scopes)) {
                    Config._github.authorization.delete({id: res.id}, function (err) {
                        if (err) { return callback(err); }
                        Config._github.authorization.create(opts, function (err, res) {
                            if (err) return callback(err);
                            Config.token = res.token;
                            login(callback);
                        });
                    });
                    return;
                }
                return login(callback);
            }

            var error;
            try {
                error = JSON.parse(err.message).message;
            } catch (e) {
                error = err.toString();
            }


            if (error.indexOf("Must specify two-factor authentication OTP code.") !== -1 && !Config.otp) {
                while (!(Config.otp = Config.prompt("2FA Authentication Code"))) {}
                login(callback);
            } else if (error || err) {
                return callback(error || err);
            }
        });
    }

    Config._github.users.get({}, function (err, user) {
        if (err) {
            delete Config.username;
            delete Config.password;
            delete Config.otp;
            delete Config.token;
            return callback(err);
        }

        Fs.writeFileSync(Config.CONFIG_PATH, JSON.stringify({
            username: Config.username
          , token: Config.token
        }));

        callback(null, user);
    });
};
