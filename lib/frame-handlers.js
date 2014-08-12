var Prompt = require("prompt")
  , Profile = require(CONFIG.root + "/lib/ui/profile")
  ;

Prompt.start();
Prompt.message = "";
Prompt.delimiter = "";

var schemas = {
    newRepository: {
        properties: {
            name: {
                message: "Invalid repository name."
              , required: true
              , description: "Repository name:"
            }
          , description: {
                message: "Invalid repository description."
              , description: "Repository description (optional):"
            }
          , homepage: {
                message: "Invalid homepage."
              , description: "Repository homepage (optional):"
            }
          , private: {
                description: "Private repository (false):"
              , validator: /true|false/
              , warning: "Must respond true or false"
              , default: "false"
              , type: "boolean"
            }
        }
    }
};

module.exports = {
    "news-feed": {
        // Create repository
        "C": function () {
            Prompt.get(schemas.newRepository, function (err, result) {
                CONFIG._github.repos.create(result, function (err, data) {
                    console.log(err || data);
                });
            });
        }
        // Profile
      , "P": function () {
            Profile(CONFIG.username, function () {

            });
        }
        // Show issues
      , "I": function () {

        }
        // Show pull requests
      , "R": function () {

        }
    }
};
