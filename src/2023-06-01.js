const { emptyData, loadImg, zoomIn } = require("./tools");

["flowers4.png", "flowers2.png", "trees1.png"].forEach((file, i) => {
  const img = emptyData();
  const { width, height } = img;
  const src = loadImg(file);

  let xx = 0;
  let yy = 0;
  let rad = Math.PI / 3;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      img.set(x, y, src.get(Math.floor(xx), Math.floor(yy)));
      xx = (xx + width + Math.sin(rad)) % width;
      yy = (yy + height + Math.cos(rad)) % height;
    }
    rad += 0.0009;
  }

  zoomIn(img, 500, 0, 200, 700).writeOut(__filename, i + 1);
});
