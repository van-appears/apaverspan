const emptyData = require("../tools/empty-data");

module.exports = function rescale(src) {
  const { width, height } = src;

  let minR = 255,
    minG = 255,
    minB = 255,
    maxR = 0,
    maxG = 0,
    maxB = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const { r, g, b } = src.get(x, y);
      minR = Math.min(minR, r);
      minG = Math.min(minG, g);
      minB = Math.min(minB, b);
      maxR = Math.max(maxR, r);
      maxG = Math.max(maxG, g);
      maxB = Math.max(maxB, b);
    }
  }

  const rescaler = ({ r, g, b }) => ({
    r: Math.round((255 * (r - minR)) / (maxR - minR)),
    g: Math.round((255 * (g - minG)) / (maxG - minG)),
    b: Math.round((255 * (b - minB)) / (maxB - minB))
  });

  const img = emptyData();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      img.set(x, y, rescaler(src.get(x, y)));
    }
  }

  return img;
};
