const PNG = require("pngjs").PNG;
const extendPng = require("./extend-png");
const { IMAGE_SIZE } = require("./constants");
const { BLACK } = require("./colours");
const size = { width: IMAGE_SIZE, height: IMAGE_SIZE };

module.exports = function (background = BLACK) {
  const img = new PNG(size);
  extendPng(img);
  for (let x = 0; x < size.width; x++) {
    for (let y = 0; y < size.height; y++) {
      img.set(x, y, background);
    }
  }
  return img;
};
