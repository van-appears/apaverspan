const { partialRotate, emptyData, loadImg } = require("./tools");

const diff = (col1, col2) => ({
  r: Math.abs(col1.r - col2.r),
  g: Math.abs(col1.g - col2.g),
  b: Math.abs(col1.b - col2.b)
});

["flowers3.png", "flowers2.png"].forEach((file, i) => {
  const img = emptyData();
  const { width, height } = img;
  const source = loadImg(file);
  const rot1 = partialRotate(source, 700, 700, 1000, 1000, 0.05);
  const rot2 = partialRotate(source, 700, 700, 1000, 1000, -0.05);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      img.set(x, y, diff(rot1.get(x, y), rot2.get(x, y)));
    }
  }

  img.writeOut(__filename, i + 1);
});
