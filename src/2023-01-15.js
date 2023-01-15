const { loadImg, random, fillCircle } = require("./tools");
const { int } = random(__filename);

const adder = (col1, col2) => ({
  r: (col1.r + col2.r) % 255,
  g: (col1.g + col2.g) % 255,
  b: (col1.b + col2.b) % 255
});

["flowers2.png", "flowers3.png", "shell1.png"].forEach((file, i) => {
  const img = loadImg(file);
  const { width, height } = img;
  const filler = fillCircle(img);

  for (let loop = 0; loop < 300; loop++) {
    const x = int(width);
    const y = int(height);

    const radius = 200;
    filler(x, y, radius, (previous, xx, yy) =>
      xx < 0 || xx >= width || yy < 0 || yy >= height
        ? null
        : adder(previous, previous)
    );
  }

  img.writeOut(__filename, i + 1);
});
