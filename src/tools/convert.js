const convert = require("color-convert");

function colFromHsv(h, s, v) {
  const [r, g, b] = convert.hsv.rgb.raw(h, s, v);
  return { r, g, b };
}

function hsvFromCol(col) {
  const [h, s, v] = convert.rgb.hsv.raw(col.r, col.g, col.b);
  return { h, s, v };
}

module.exports = {
  colFromHsv,
  hsvFromCol
};
