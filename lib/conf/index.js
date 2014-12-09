// Dependencies
var Path = require("path");

// Constants
const HOME_DIRECTORY = process.env[
    process.platform == "win32" ? "USERPROFILE" : "HOME"
];

process.stdout.columns = process.stdout.columns || 212;
process.stdout.rows = process.stdout.rows || 56;

// Configuration
module.exports = {
    root: Path.resolve(__dirname, "../..")
  , cli: {
        w: process.stdout.columns
      , h: process.stdout.rows
    }
  , cache: {
        avatars: {}
    }
  , promptRunning: false
  , HOMDE_DIR: HOME_DIRECTORY
  , CONFIG_PATH: HOME_DIRECTORY + "/.github-config.json"
  , title: "CLI GitHub - A fancy GitHub client."
  , description: "</> with <3 by @IonicaBizau"
};
