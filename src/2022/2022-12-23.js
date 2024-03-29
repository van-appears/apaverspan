const { colours, loadImg, random, rotations } = require("../tools");
const { rndBoolean } = random(__filename);

const img = rotations.clockwise90(loadImg("flowers2.png"));
const { width, height } = img;

for (let y = 1; y < height; y++) {
  for (let x = 0; x < width - y; x++) {
    const col1 = img.get(x, y + x - 1);
    const col2 = img.get(x + 1, y + x);
    img.set(x, y + x, rndBoolean() ? col2 : colours.avg(col1, col2));
  }
}

for (let x = 1; x < width; x++) {
  for (let y = 0; y < height - x; y++) {
    const col1 = img.get(x + y - 1, y);
    const col2 = img.get(x + y, y + 1);
    img.set(x + y, y, rndBoolean() ? col1 : colours.avg(col1, col2));
  }
}

img.writeOut(__filename);
