const convert = require("color-convert");
const loadImg = require("./load-img");

module.exports = function (opts) {
  const { img, file, xlimit, ylimit, mode } = opts;
  const source = img || loadImg(file);

  let { width, height } = source;
  if (xlimit) {
    width = xlimit;
  }
  if (ylimit) {
    height = ylimit;
  }

  function getColourObj(x, y) {
    const col = source.get(x, y);
    const [h, s, v] = convert.rgb.hsv.raw(col.r, col.g, col.b);
    return { x, y, ...col, h, s, v };
  }

  if (mode === "row") {
    const rows = new Array(height);
    for (let y = 0; y < height; y++) {
      const row = new Array(width);
      for (let x = 0; x < width; x++) {
        row[x] = getColourObj(x, y);
      }
      rows[y] = row;
    }
    return rows;
  }

  if (mode === "column") {
    const columns = new Array(width);
    for (let x = 0; x < width; x++) {
      const column = new Array(height);
      for (let y = 0; y < height; y++) {
        column[y] = getColourObj(x, y);
      }
      columns[x] = column;
    }
    return columns;
  }

  let counter = 0;
  const data = new Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      data[counter] = getColourObj(x, y);
      counter++;
    }
  }
  return data;
};
