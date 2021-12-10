const { attributeSorter, emptyData, loadImg } = require("./tools");
const convert = require("color-convert");

const img = emptyData();
const { width, height } = img;
const source1 = loadImg("flowers1.png");
const source2 = loadImg("flowers3.png");
const sorter = attributeSorter(["g", "r", "b"]);

const pair = (x, y) => [source1.get(x, y), source2.get(x, y)];

for (let y = 0; y < height; y++) {
  for (x = 0; x < width; x++) {
    const keep = pair(x, y).sort(sorter)[0];
    img.set(x, y, keep);
  }
}

img.writeOut(__filename);
