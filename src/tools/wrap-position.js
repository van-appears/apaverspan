module.exports = function (img) {
  const { width, height } = img;
  const wrapX = x => {
    while (x < 0) {
      x += width;
    }
    return x % width;
  };
  const wrapY = y => {
    while (y < 0) {
      y += height;
    }
    return y % height;
  };

  return {
    wrapX,
    wrapY,
    wrap({ x, y }) {
      return {
        x: wrapX(x),
        y: wrapY(y)
      };
    }
  };
};
