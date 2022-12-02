const {
  asNum,
  loadImg,
  colours,
  emptyData,
  fillCircle,
  wrapPosition,
  random
} = require("./tools");

const { int, bool, val } = random(asNum(__filename));
const source = loadImg("location1.png");

[0.666, 0.333].forEach((ratio, i) => {
  const img = emptyData();
  const filler = fillCircle(img);
  const { width, height } = img;
  const { wrapX, wrapY } = wrapPosition(img);
  const mixer = colours.mix(ratio, 1 - ratio);

  for (let loop = 0; loop < 1000; loop++) {
    const x = int(width);
    const y = int(height);
    const col = source.get(x, y);

    for (let xi = -8; xi <= 8; xi++) {
      for (let yi = -8; yi <= 8; yi++) {
        if (xi * xi + yi * yi <= 64 && val() < 1 - ratio) {
          const atx = wrapX(x + 80 * xi);
          const aty = wrapY(y + 80 * yi);
          const size = 5 + int(25);
          filler(atx, aty, size, prev => mixer(prev, col), true);
        }
      }
    }
  }

  img.writeOut(__filename, i + 1);
});
