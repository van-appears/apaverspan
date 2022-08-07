const wrapPosition = require("./wrap-position");

module.exports = function (img) {
  const { wrapX, wrapY } = wrapPosition(img);

  const filler = (x, y, radius, colourOrFun, wrap) => {
    const r2 = radius * radius;
    const isColourFn = typeof colourOrFun === "function";
    for (let xi = -radius; xi <= radius; xi++) {
      for (let yi = -radius; yi <= radius; yi++) {
        if (xi * xi + yi * yi <= r2) {
          const thisX = wrap ? wrapX(x + xi) : x + xi;
          const thisY = wrap ? wrapY(y + yi) : y + yi;

          if (isColourFn) {
            const previous = img.get(thisX, thisY);
            img.set(thisX, thisY, colourOrFun(previous, thisX, thisY));
          } else {
            img.set(thisX, thisY, colourOrFun);
          }
        }
      }
    }
  };
  if (arguments.length >= 5) {
    filler(
      arguments[1],
      arguments[2],
      arguments[3],
      arguments[4],
      arguments[5]
    );
  }
  return filler;
};
