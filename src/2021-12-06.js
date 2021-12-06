const { emptyData, loadImg } = require("./tools");
const convert = require("color-convert");

const img = emptyData();
const { width, height } = img;
const source1 = loadImg("flowers1.png");
const source2 = loadImg("flowers3.png");

const hsv = (source, x, y) => {
  const { r, g, b } = source.get(x, y);
  return convert.rgb.hsv.raw(r, g, b);
};

for (let y = 0; y < height; y++) {
  for (x = 0; x < width; x++) {
    const [, s] = hsv(source1, x, y);
    const [h] = hsv(source2, x, y);
    const [r, g, b] = convert.hsv.rgb.raw(h, s, 100);
    img.set(x, y, { r, g, b });
  }
}

img.writeOut(__filename);
