const { loadImg } = require("./tools");
const avgImgData = require("./process/avg-img-data");
const src = loadImg("flowers3.png");

[0.007, 0.005, 0.01].forEach((radChange, i) => {
  const avgImg = avgImgData();
  const { width, height } = avgImg;

  let xx = 0;
  let yy = 0;
  let rad = Math.PI / 8;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      avgImg.set(Math.floor(xx), Math.floor(yy), src.get(x, y));
      xx = (xx + width + Math.sin(rad)) % width;
      yy = (yy + height + Math.cos(rad)) % height;
    }
    rad += radChange;
  }

  avgImg.asImg().writeOut(__filename, i);
});
