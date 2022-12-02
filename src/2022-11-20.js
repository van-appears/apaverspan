const { emptyData, loadImg, collectColours, rotations } = require("./tools");
const convert = require("color-convert");

const img = emptyData();
const sourceCols = collectColours({
  img: loadImg("flowers3.png")
});

const valueToRad = value => (2 * Math.PI * value) / 100;
const sin = value => Math.sin(valueToRad(value));
const cos = value => Math.cos(valueToRad(value));

sourceCols.forEach(sourceCol => {
  const { x, y, h, s, v } = sourceCol;
  const newx = x + Math.floor(2 * h * sin(v));
  const newy = y + Math.floor(2 * h * cos(v));
  const [r, g, b] = convert.hsv.rgb.raw(h + (s % 360), s, v);
  img.set(newx, newy, { r, g, b });
});

rotations.clockwise180(img).writeOut(__filename);
