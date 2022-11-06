const { colours, emptyData, loadImg, quadrantZoom } = require("./tools");
const convert = require("color-convert");
const { BLACK } = colours;

const img = emptyData();
const source = loadImg("flowers1.png");
const { width, height } = img;

for (let y = 0; y < height; y++) {
  const matchS = 100 - Math.floor((100 * y) / height);
  for (let x = 0; x < width; x++) {
    const col = source.get(x, y);
    const { r, g, b } = col;
    const [, s] = convert.rgb.hsv.raw(r, g, b);
    if (s >> 2 === matchS >> 2) {
      img.set(x, y, col);
    }
  }
}

const quarters = quadrantZoom(img);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const cols = quarters.map(q => q.get(x, y)).filter(c => !BLACK.equals(c));
    const col = cols[cols.length - 1] || BLACK;
    img.set(x, y, col);
  }
}

img.writeOut(__filename);
