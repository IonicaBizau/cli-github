var Table = require("le-table")
  , Overlap = require("overlap")
  , Profile = require("../api/profile")
  , Utils = require(CONFIG.root + "/lib/utils")
  , ImageToAscii = require("image-to-ascii")
  , Moment = require("moment")
  ;

function getAvatar(userObj, callback) {
    var fCache = CONFIG.cache.avatars[userObj.login];
    if (fCache) {
        return callback(null, fCache);
    }

    var avatar = new ImageToAscii({
            resize: { height: "70%" }
        });

    avatar.convert(userObj.avatar_url, function (err, cAvatar) {
        if (err) { return callback(err); }
        callback(null, CONFIG.cache.avatars[userObj.login] = cAvatar);
    });
}

module.exports = function (options, callback) {
    Profile(options, function (err, data) {
        if (err) { return callback(err); }
        getAvatar(data, function (err, cAvatar) {
            var profileScreen = Overlap({
                who: CONFIG.background.toString()
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
            CONFIG.currentFrame = "profile";
            console.log(profileScreen.trim());
        });
    });
};
