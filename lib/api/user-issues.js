// Dependencies
var Request = require("request")
  , QueryString = require("querystring")
  ;

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

module.exports = function (options, progress, callback) {
    options = Object(options);
    options.type = options.type || "all";

    getAll("https://api.github.com/search/issues?" + QueryString.stringify(options.ops), function (err, body) {


        if (err) { return callback(err); }
        var res = [];
        for (var i = 0; i < body.length; ++i) {
            var c = body[i];
            if (options.type === "issues") {
                if (!c.pull_request) {
                    res.push(c);
                }
            } else if (options.type === "pullrequests") {
                if (c.pull_request) {
                    res.push(c);
                }
            } else {
                res.push(c);
            }
        }

        callback(null, res);
    }, progress);
};
