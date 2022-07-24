const {
  collectColours,
  drawLine,
  emptyData,
  wrapPosition
} = require("./tools");

const files = [
  "flowers1.png",
  "location1.png",
  "shell1.png",
  "flowers2.png",
  "trees1.png"
];

files.forEach((file, i) => {
  const img = emptyData();
  const { width, height } = img;
  const { wrapX, wrapY } = wrapPosition(img);
  const line = drawLine(img);

  let rad = 0;
  let lastX = width / 2;
  let lastY = height / 2;
  let lastCol = { r: 0, g: 0, b: 0 };
  collectColours({ file }).forEach(col => {
    rad += (Math.PI * col.h) / 360;
    const distance = 7 + (7 * col.v) / 100;
    const x = lastX + distance * Math.sin(rad);
    const y = lastY + distance * Math.cos(rad);
    line(lastX, lastY, x, y, lastCol, col);

    lastX = wrapX(x);
    lastY = wrapY(y);
    lastCol = col;
  });

  img.writeOut(__filename, i + 1);
});
