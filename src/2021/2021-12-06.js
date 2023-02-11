const { convert, emptyData, loadImg } = require("../tools");

const img = emptyData();
const { width, height } = img;
const source1 = loadImg("flowers1.png");
const source2 = loadImg("flowers3.png");

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const { s } = convert.hsvFromCol(source1.get(x, y));
    const { h } = convert.hsvFromCol(source2.get(x, y));
    img.set(x, y, convert.colFromHsv(h, s, 100));
  }
}

img.writeOut(__filename);
