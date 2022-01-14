const {
  asNum,
  attributeSorter,
  collectColours,
  colours,
  emptyData,
  loadImg,
  random,
  setImg
} = require("./tools");

const { mix } = colours;
const rnd = random(asNum(__filename));
const img = emptyData();
const { width, height } = img;

setImg({
  img,
  source: loadImg("shell1.png"),
  remap: (x, y) => {
    return { x: (x + x + y) % width, y };
  }
});

const drawRandomLine = ({ x, y, r, g, b }) => {
  let rad = rnd.val(Math.PI * 2);
  let xx = Math.sin(rad);
  let yy = Math.cos(rad);
  let mixCol = { r, g, b };
  for (let ratio = 0; ratio < 150; ratio++) {
    x += xx;
    y += yy;
    let flx = Math.floor(x);
    let fly = Math.floor(y);
    let current = img.get(flx, fly);
    if (current) {
      img.set(flx, fly, mix(mixCol, img.get(flx, fly), 150 - ratio, ratio));
    }
  }
};

collectColours({ img })
  .sort(attributeSorter(["h", "s", "v"]))
  .filter((_, i) => i % 10 == 0)
  .forEach(colourObj => drawRandomLine(colourObj));

img.writeOut(__filename);
