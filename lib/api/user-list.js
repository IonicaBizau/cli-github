// Dependencies
var Config = require("../conf")
  , Request = require("request")
  , QueryString = require("querystring")
  ;

/**
 * UserIssues
 * Fetches the user issues or pull requests.
 *
 * @name UserIssues
 * @function
 * @param {Object} options An object containing the following fields:
 *
 *  - `ops` (Object): the querystring parameters as object
 *
 * @param {Function} progress The progress function.
 * @param {Function} callback The callback function.
 * @return {undefined}
 */
module.exports = function (options, callback) {
    if (options.type === "followers") {
        return Config._github.users.getFollowersForUser({
            username: options.user
          , per_page: 100
        }, callback);
    } else if (options.type === "following") {
        return Config._github.users.getFollowingForUser({
            username: options.user
          , per_page: 100
        }, callback);
    } else if (options.type === "members") {
        return Config._github.orgs.getMembers({
            org: options.user
          , per_page: 100
        }, callback);
    }
};
