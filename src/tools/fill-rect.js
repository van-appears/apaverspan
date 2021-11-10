module.exports = function (img) {
  const filler = (x, y, width, height, colour) => {
    for (let xi = 0; xi < width; xi++) {
      for (let yi = 0; yi < height; yi++) {
        img.set(x + xi, y + yi, colour);
      }
    }
  };
  if (arguments.length === 6) {
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
