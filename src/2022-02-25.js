const { emptyData, loadImg, collectColours, zoomIn } = require("./tools");
const convert = require("color-convert");

const img = emptyData();
const { width, height } = img;
const sourceCols = collectColours({
  img: loadImg("flowers1.png"),
  mode: "row"
});

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const col1 = sourceCols[y][x];
    const col2 = sourceCols[width - 1 - x][y];
    const col3 = sourceCols[height - 1 - y][width - 1 - x];

    const [r, g, b] = convert.hsv.rgb.raw(
      360 - col1.v,
      100 - col2.h,
      100 - col3.s
    );
    img.set(x, y, { r, g, b });
  }
}

const zoom1 = zoomIn(img, width - 300, height - 300, 300, 300, true);
zoom1.writeOut(__filename, 1);

const zoom2 = zoomIn(img, width - 600, 0, 600, 600, true);
zoom2.writeOut(__filename, 2);

const zoom3 = zoomIn(img, 0, height - 500, 500, 500, true);
zoom3.writeOut(__filename, 3);

img.writeOut(__filename, 4);
