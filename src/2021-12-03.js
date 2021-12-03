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
    const [h] = hsv(source1, x, y);
    const [, , v] = hsv(source2, x, y);
    const [r, g, b] = convert.hsv.rgb.raw(h, 100, v);
    img.set(x, y, { r, g, b });
  }
}

img.writeOut(__filename);
