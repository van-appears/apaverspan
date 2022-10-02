const { constants, emptyData, loadImg, zoomIn } = require("./tools");

const img = emptyData();
const { width, height } = img;
const dataR = new Array(width * height).fill(0);
const dataG = new Array(width * height).fill(0);
const dataB = new Array(width * height).fill(0);
const asIndex = (x, y) => y * height + x;

const score = val => (val % 128 < 64 ? 0 : 1);
constants.ALL_FILES.forEach(f => {
  const source = loadImg(f);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = asIndex(x, y);
      const { r, g, b } = source.get(x, y);
      dataR[index] += score(r);
      dataG[index] += score(g);
      dataB[index] += score(b);
    }
  }
});

const pick = val => (val >= 4 ? 255 : 0);
const simplify = index => ({
  r: pick(dataR[index]),
  g: pick(dataG[index]),
  b: pick(dataB[index])
});

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    img.set(x, y, simplify(asIndex(x, y)));
  }
}

zoomIn(img, 0, 0, 700, 700, true).writeOut(__filename, 1);
zoomIn(img, 275, 625, 700, 700, true).writeOut(__filename, 2);
zoomIn(img, 700, 0, 700, 700, true).writeOut(__filename, 3);
