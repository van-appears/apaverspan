const { emptyData, loadImg } = require("./tools");
const convert = require("color-convert");

const img = emptyData();
const { width, height } = img;
const source1 = loadImg("flowers3.png");
const source2 = loadImg("flowers1.png");

const hsv = (source, x, y) => {
  const {r, g, b} = source.get(x, y);
  return convert.rgb.hsv.raw(r, g, b);
}

for (let y = 0; y < height; y++) {
  for (x = 0; x < width; x++) {
    const [h1, s1, v1] = hsv(source1, x, y);
    const [h2, s2, v2] = hsv(source2, x, y);
    const [r, g, b] = convert.hsv.rgb.raw(h2, 100, v1);
    img.set(x, y, { r, g, b });
  }
}

img.writeOut(__filename);
