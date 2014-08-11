var Request = require("request")
  , Table = require("le-table")

// Set default marks
Table.defaults.marks = {
    nw: "┌"
  , n:  "─"
  , ne: "┐"
  , e:  "│"
  , se: "┘"
  , s:  "─"
  , sw: "└"
  , w:  "│"
  , b: " "
  , mt: "┬"
  , ml: "├"
  , mr: "┤"
  , mb: "┴"
  , mm: "┼"
};


var handlers = {
    "CreateEvent": {
        icon: "⊕"
      , message: function (cEv) {
            return cEv.actor + " created repository " + cEv.url.replace("https://github.com/", "");
        }
    }
  , "WatchEvent": {
        icon: "★"
      , message: function (cEv) {
            return cEv.actor + " starred repository " + cEv.url.replace("https://github.com/", "");
        }
    }
};

Request.get({
    auth: {
        username: "IonicaBizau"
      , password: CONFIG.access_token
    }
  , url: "https://github.com/IonicaBizau.private.json"
  , json: true
}, function (err, status, body) {
    if (err) { throw err; }
    var timeline = new Table();
    timeline.addRow(["#", {
        text: "Type"
      , data: {
            width: 8
          , hAlign: "center"
        }
    }, "Description"]);
    for (var i = 0; i < body.length; ++i) {
        var cEv = body[i]
          , handler = handlers[cEv.type]
          ;

        if (!handler) {
            debugger
            continue;
        }

        timeline.addRow([{
            text: i + 1
          , data: {
                vAlign: "middle"
              , width: 6
            }
        }, {
            text: handler.icon
          , data: {
                hAlign: "center"
              , vAlign: "middle"
              , height: 3
            }
        }, {
            text: handler.message(cEv)
          , data: {
                vAlign: "middle"
            }
        }]);
    }
    console.log(timeline.toString());
});
