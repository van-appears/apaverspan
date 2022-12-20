const { asNum, colours, loadImg, random, rotations } = require("./tools");
const { clockwise90 } = rotations;
const { rndBoolean } = random(asNum(__filename));

const mix = (col1, col2) => {
  const first = colours.avg(col1, col2);
  return colours.mix(first, rndBoolean() ? col1 : col2, 0.99, 0.01);
};

[
  "flowers1.png",
  "flowers2.png",
  "shell1.png",
  "trees1.png",
  "location1.png"
].forEach((file, i) => {
  const img = clockwise90(loadImg(file));
  const { width, height } = img;

  for (let y = 1; y < height; y++) {
    for (let x = 0; x < width - y; x++) {
      const col1 = img.get(x, y + x - 1);
      const col2 = img.get(x + 1, y + x);
      img.set(x, y + x, mix(col1, col2));
    }
  }

  for (let x = 1; x < width; x++) {
    for (let y = 0; y < height - x; y++) {
      const col1 = img.get(x + y - 1, y);
      const col2 = img.get(x + y, y + 1);
      img.set(x + y, y, mix(col1, col2));
    }
  }

  img.writeOut(__filename, i + 1);
});
