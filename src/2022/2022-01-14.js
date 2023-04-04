const {
  attributeSorter,
  collectColours,
  emptyData,
  random,
  setImg
} = require("../tools");

const drawRandomLine = require("../process/draw-random-line-from-point");

const rnd = random(__filename);
const img = emptyData();
const { width } = img;
const draw = drawRandomLine({ rnd, img, length: 150 });

setImg({
  img,
  file: "shell1.png",
  remap: (x, y) => ({ x: (x + x + y) % width, y })
});

collectColours({ img })
  .sort(attributeSorter(["h", "s", "v"]))
  .filter((_, i) => i % 10 == 0)
  .forEach(draw);

img.writeOut(__filename);
