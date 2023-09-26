const { collectColours, convert, emptyData, random } = require("./tools");
const { rndInt } = random(__filename);

const img = emptyData();
collectColours({ file: "trees1.png" }).forEach(({ x, y, h }) => {
  let s = rndInt(100);
  let v = rndInt(100);
  img.set(x, y, convert.colFromHsv(h, s, v));
});

img.writeOut(__filename);
