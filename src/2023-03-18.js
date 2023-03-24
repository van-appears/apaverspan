const { colours, loadImg, zoomIn } = require("./tools");

const imgs = new Array(14);
const img = (imgs[0] = loadImg("trees1.png"));
const { width, height } = img;

for (let loop = 1; loop < 14; loop++) {
  const offsetX = Math.round(50 * Math.cos((Math.PI * 2 * loop) / 13));
  const offsetY = Math.round(50 * Math.sin((Math.PI * 2 * loop) / 13));

  imgs[loop] = zoomIn(
    imgs[0],
    offsetX + loop * 50,
    offsetY + loop * 50,
    width - loop * 100,
    height - loop * 100
  );
}

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const cols = imgs.map(img => img.get(x, y));
    img.set(x, y, colours.avg(...cols));
  }
}

img.writeOut(__filename);
