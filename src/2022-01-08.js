const { emptyData, loadImg, collectColours } = require("./tools");
const convert = require("color-convert");

const img = emptyData();
const { width, height } = img;
const sourceCols = collectColours({
  img: loadImg("shell1.png"),
  xlimit: width,
  ylimit: height,
  mode: "row"
});

for (let y = 0; y < height; y++) {
  for (x = 0; x < width; x++) {
    const col1 = sourceCols[width - 1 - x][y];
    const col2 = sourceCols[height - 1 - y][width - 1 - x];
    const col3 = sourceCols[y][x];

    const [r, g, b] = convert.hsv.rgb.raw(col1.h, col2.v, col3.s);
    img.set(x, y, { r, g, b });
  }
}

img.writeOut(__filename);
