const { colours, loadImg, partialRotate } = require("./tools");

const mix = (col1, col2, col3) => {
  const first = colours.avg(col2, col3);
  return colours.mix(col1, first, 0.05, 0.95);
};

[
  "flowers2.png",
  "location1.png",
  "flowers3.png",
  "trees1.png",
  "shell1.png",
  "flowers1.png"
].forEach((file, i) => {
  let img = loadImg(file);
  const { width, height } = img;

  for (let loop = 0; loop < 9; loop++) {
    for (let y = 1; y < height; y++) {
      for (let x = 0; x < width - y; x++) {
        const col1 = img.get(x, y + x);
        const col2 = img.get(x, y + x - 1);
        const col3 = img.get(x + 1, y + x);
        img.set(x, y + x, mix(col1, col2, col3));
      }
    }

    for (let x = 1; x < width; x++) {
      for (let y = 0; y < height - x; y++) {
        const col1 = img.get(x + y, y);
        const col2 = img.get(x + y - 1, y);
        const col3 = img.get(x + y, y + 1);
        img.set(x + y, y, mix(col1, col2, col3));
      }
    }

    img = partialRotate(img, width / 2, height / 2, 1100, 1100, Math.PI / 9);
  }

  img.writeOut(__filename, i + 1);
});
