const fillDirection = require("../tools/fill-direction");
const QUARTER_ROT = Math.PI / 2;

module.exports = function fillDirectionRadian(img) {
  const { fillLeft, fillTop, fillRight, fillBottom } = fillDirection(img);
  return (x1, y1, x2, y2, radian, colourOrFn) => {
    if (radian > QUARTER_ROT * 2.5 && radian < QUARTER_ROT * 3.5) {
      fillLeft(x1, y1, x2, y2, colourOrFn);
    } else if (radian > QUARTER_ROT * 1.5 && radian < QUARTER_ROT * 2.5) {
      fillTop(x1, y1, x2, y2, colourOrFn);
    } else if (radian > QUARTER_ROT * 0.5 && radian < QUARTER_ROT * 1.5) {
      fillRight(x1, y1, x2, y2, colourOrFn);
    } else {
      fillBottom(x1, y1, x2, y2, colourOrFn);
    }
  };
};
