const loadImg = require("./load-img");

const getAt = (x, y) => ({ x, y });

module.exports = function ({ img, source, file, remap = getAt }) {
  const sourceImg = source || loadImg(file);
  const { width, height } = img;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pos = remap(x, y);
      img.set(x, y, sourceImg.get(pos.x, pos.y));
    }
  }
};
