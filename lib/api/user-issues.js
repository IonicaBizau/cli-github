// Dependencies
var Request = require("request")
  , QueryString = require("querystring")
  ;

/*!
 * getAll
 * Fetches **all** objects of some type.
 *
 * @name getAll
 * @function
 * @param {String} url The url that doesn't contain the page parameter.
 * @param {Function} callback The callback function.
 * @param {Function} progress The progress function.
 * @param {Number|undefined} i The current page number (default: 1).
 * @param {Array} data Older data objects (fetched already).
 * @return {undefined}
 */
function getAll(url, callback, progress, i, data) {
    data = data || [];
    i = i || 1;
    Request.get({
        auth: {
            username: CONFIG.username
          , password: CONFIG.password
        }
      , headers: {
            "user-agent": "GitHub - CLI"
        }
      , json: true
      , url: url + "&page=" + i
    }, function (err, status, body) {
        if (err || body.error) { return callback(err || body.error); }
        data = data.concat(body.items);
        if (!body.items.length) {
            return callback(null, data);
        }

        progress("Fetched page: " + i);
        getAll(url, callback, progress, i + 1, data);
    });
}

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
module.exports = function (options, progress, callback) {
    options = Object(options);
    getAll("https://api.github.com/search/issues?" + QueryString.stringify(options.ops), function (err, res) {
        if (err) { return callback(err); }
        callback(null, res);
    }, progress);
};
