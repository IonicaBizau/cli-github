// Dependencies
var Config = require("../conf")
  , Table = require("le-table")
  , Overlap = require("overlap")
  , Profile = require("../api/profile")
  , Utils = require(Config.root + "/lib/utils")
  , ImageToAscii = require("image-to-ascii")
  , Moment = require("moment")
  ;

/*!
 * getAvatar
 * Gets the avatar in ascii format.
 *
 * @name getAvatar
 * @function
 * @param {Object} userObj User resource object
 * @param {Function} callback The callback function
 * @return {undefined}
 */
function getAvatar(userObj, callback) {
    var fCache = Config.cache.avatars[userObj.login];
    if (fCache) {
        return callback(null, fCache);
    }

    var size = parseInt(Config.cli.h * 0.7);
    ImageToAscii({
        path: userObj.avatar_url
      , size: { height: size, width: size * 2 }
      , pxWidth: 1
      , colored: false
    }, function (err, cAvatar) {
        if (err) { return callback(err); }
        callback(null, Config.cache.avatars[userObj.login] = cAvatar);
    });
}

/**
 * Profile
 * Shows the profile view.
 *
 * @name Profile
 * @function
 * @param {Object} options The options object.
 * @param {Function} progress The progress function.
 * @param {Function} callback The callback function
 * @return {undefined}
 */
module.exports = function (options, progress, callback) {
    Profile(options, progress, function (err, data) {
        if (err) { return callback(err); }
        getAvatar(data, function (err, cAvatar) {

            // Profile
            var profileScreen = Overlap({
                who: Config.background.toString()
              , with: cAvatar
              , where: {
                    x: 3
                  , y: 2
                }
            });
            var info = []
              , name = data.name + " (@" + data.login + ")"
              , separator = Array(name.length).join("-")
              ;

            info.push(separator);
            info.push(name)
            info.push(separator);
            if (data.company) { info.push("♟  " + data.company); }
            if (data.location) { info.push("༐ " + data.location); }
            if (data.email) { info.push("✉ " + data.email); }
            if (data.blog) { info.push("⊜  " + data.blog); }
            if (data.created_at) { info.push("⇴ Joined on " + Moment(data.created_at).format("LL")); }
            if (data.followers) {
                info.push(separator);
                info.push("Followers: " + data.followers);
                info.push("Following: " + data.following);
            }

            profileScreen = Utils.overlap(profileScreen, info, cAvatar.split("\n").length + 2, 3);

            // Repositories
            var repos = new Table();
            repos.addRow(["#", "Type", "Name", "SSH URL"]);
            var show = Math.floor((Config.cli.h - 3) / 2) - 3;
            if (show > data.repos.length) {
                show = data.repos.length;
            }

            for (var i = 0; i < show; ++i) {
                var cRepo = data.repos[i]
                  , type = "source"
                  ;

                if (cRepo.fork) { type = "fork"; }
                if (cRepo.private) { type = "private"; }

                repos.addRow([i + 1, type, cRepo.name, cRepo.ssh_url]);
            }

            var cRepos = repos.toString().trim();
            profileScreen = Utils.overlap(profileScreen, [
                "Repositories"
              , cRepos
            ], 2, cAvatar.split("\n")[0].length + 5);

            // Organizations
            var orgs = new Table();
            orgs.addRow(["#", "Name"]);

            for (var i = 0; i < data.orgs.length; ++i) {
                var cOrg = data.orgs[i];
                orgs.addRow([i + 1, cOrg.login]);
            }

            if (data.orgs.length) {
                profileScreen = Utils.overlap(profileScreen, [
                    "Organizations"
                  , orgs.toString().trim()
                ], 2, cAvatar.split("\n")[0].length + 5 + cRepos.split("\n")[0].length + 3);
            }

            Config.currentFrame = "profile";

            Config.cli.update.render(profileScreen.trim(), true, {
                currentFrame: Config.currentFrame
            });
        });
    });
};
