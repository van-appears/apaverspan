const { colours } = require("../tools");
const { mix } = colours;

module.exports = function ({ rnd, img, length }) {
  return ({ x, y, r, g, b }) => {
    let rad = rnd.val(Math.PI * 2);
    let xx = Math.sin(rad);
    let yy = Math.cos(rad);
    let mixCol = { r, g, b };
    for (let ratio = 0; ratio < length; ratio++) {
      x += xx;
      y += yy;
      let flx = Math.floor(x);
      let fly = Math.floor(y);
      let current = img.get(flx, fly);
      if (current) {
        img.set(
          flx,
          fly,
          mix(mixCol, img.get(flx, fly), length - ratio, ratio)
        );
      }
    }
  };
};
