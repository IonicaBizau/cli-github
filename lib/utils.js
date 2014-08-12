var Overlap = require("overlap")
exports.overlapCenter = function overlapCenter(background, text, y) {
    if (typeof text === "string") {
        return Overlap({
            who: background
          , with: text
          , where: {
                x: background.split("\n")[0].length / 2 - text.length / 2
              , y: y
            }
        });
    }

    if (text.constructor === Array) {
        for (var i = 0; i < text.length; ++i) {
            background = overlapCenter(background, text[i], Number(y) + i);
        }
        return background;
    }
}
