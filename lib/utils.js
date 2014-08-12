var Overlap = require("overlap");

exports.overlap = function overlapCenter(background, text, y, x) {
    if (typeof text === "string") {
        return Overlap({
            who: background
          , with: text
          , where: {
                x: x === "center" ? background.split("\n")[0].length / 2 - text.length / 2 - 1 : x
              , y: y
            }
        });
    }

    if (text.constructor === Array) {
        for (var i = 0; i < text.length; ++i) {
            background = overlapCenter(background, text[i], Number(y) + i, x);
        }
        return background;
    }
};
