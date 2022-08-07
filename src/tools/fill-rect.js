const wrapPosition = require("./wrap-position");

module.exports = function (img) {
  const { wrapX, wrapY } = wrapPosition(img);

  const filler = (x, y, width, height, colourOrFun, wrap) => {
    const isColourFn = typeof colourOrFun === "function";
    for (let xi = 0; xi < width; xi++) {
      for (let yi = 0; yi < height; yi++) {
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
  };
  if (arguments.length >= 6) {
    filler(
      arguments[1],
      arguments[2],
      arguments[3],
      arguments[4],
      arguments[5],
      arguments[6]
    );
  }
  return filler;
};
