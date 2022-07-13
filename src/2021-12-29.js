const { emptyData, loadImg, collectColours } = require("./tools");

const img = emptyData();
const sourceCols = collectColours({
  img: loadImg("flowers1.png")
});

const degreeToRad = degree => (2 * Math.PI * degree) / 360;
const sin = degree => Math.sin(degreeToRad(degree));
const cos = degree => Math.cos(degreeToRad(degree));

sourceCols.forEach(sourceCol => {
  const { x, y, h, v } = sourceCol;
  const newx = x + Math.floor((100 + v) * sin(h));
  const newy = y + Math.floor((100 + v) * cos(h));
  img.set(newx, newy, sourceCol);
});

img.writeOut(__filename);
