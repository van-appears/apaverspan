const emptyData = require("./empty-data");

module.exports = function (
  source,
  centreX,
  centreY,
  zoomWidth,
  zoomHeight,
  radian
) {
  const img = emptyData();
  const { width, height } = img;
  const moveX = zoomWidth / width;
  const moveY = zoomHeight / height;
  const offWidth = width / 2;
  const offHeight = height / 2;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const getX =
        centreX +
        Math.cos(radian) * (x - offWidth) * moveX -
        Math.sin(radian) * (y - offHeight) * moveY;
      const getY =
        centreY +
        Math.sin(radian) * (x - offWidth) * moveX +
        Math.cos(radian) * (y - offHeight) * moveY;
      const col = source.get(Math.floor(getX), Math.floor(getY));
      if (col) {
        img.set(x, y, col);
      }
    }
  }
  return img;
};
