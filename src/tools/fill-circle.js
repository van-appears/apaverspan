module.exports = function (img) {
  const filler = (x, y, radius, colourOrFun) => {
    const r2 = radius * radius;
    const isColourFn = typeof colourOrFun === "function";
    for (let xi = -radius; xi <= radius; xi++) {
      for (let yi = -radius; yi <= radius; yi++) {
        if (xi * xi + yi * yi <= r2) {
          if (isColourFn) {
            const previous = img.get(x + xi, y + yi);
            img.set(x + xi, y + yi, colourOrFun(x + xi, y + yi, previous));
          } else {
            img.set(x + xi, y + yi, colourOrFun);
          }
        }
      }
    }
  };
  if (arguments.length === 5) {
    filler(arguments[1], arguments[2], arguments[3], arguments[4]);
  }
  return filler;
};
