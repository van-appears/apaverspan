const {
  collectColours,
  convert,
  emptyData,
  random,
  zoomIn
} = require("./tools");
const { rndInt } = random(__filename);

const img = emptyData();
collectColours({ file: "location1.png" }).forEach(({ x, y, h }) => {
  let s = rndInt(100);
  let v = rndInt(100);
  img.set(x, y, convert.colFromHsv(h, s, v));
});

zoomIn(img, 800, 700, 600, 600).writeOut(__filename);
