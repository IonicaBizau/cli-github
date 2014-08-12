module.exports = function (options, callback) {
    CONFIG._github.user.get({
        username: options.username || options
    }, function (err, user) {
        if (err) { return callback(err); }
        callback(null, user);
    });
};
