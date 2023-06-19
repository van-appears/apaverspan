const colours = require("../tools/colours");

module.exports = function (img, col, threshold) {
  const { width, height } = img;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const allCols = [];
      for (let xx = -1; xx <= 1; xx++) {
        for (let yy = -2; yy <= 1; yy++) {
          if (!(xx === 0 && yy === 0)) {
            allCols.push(img.get(x + xx, y + yy));
          }
        }
      }

      const matches = allCols
        .filter(x => x)
        .filter(x => colours.equals(x, col)).length;
      if (matches > threshold) {
        img.set(x, y, col);
      }
    }
  }

  return img;
};
