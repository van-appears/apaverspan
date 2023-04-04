const { collectColours, convert, emptyData, loadImg } = require("../tools");

const img = emptyData();
const { width, height } = img;
const sourceCols = collectColours({
  img: loadImg("shell1.png"),
  xlimit: width,
  ylimit: height,
  mode: "column"
});

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const col1 = sourceCols[y][width - 1 - x];
    const col2 = sourceCols[width - 1 - x][height - 1 - y];
    const col3 = sourceCols[x][y];

    img.set(x, y, convert.colFromHsv(col1.h, col2.v, col3.s));
  }
}

img.writeOut(__filename);
