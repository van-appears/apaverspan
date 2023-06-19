const {
  attributeSorter,
  colours,
  emptyData,
  fillCircle,
  collectColours,
  zoomIn
} = require("./tools");
const { BLACK, WHITE } = colours;
const thresholdFill = require("./process/threshold-fill");

const inputs = [
  { file: "flowers3.png", sortAttributes: ["v", "s", "h"], zoomAt: 700 },
  { file: "shell1.png", sortAttributes: ["s", "v", "h"], zoomAt: 0 }
];

inputs.forEach(({ file, sortAttributes, zoomAt }, i) => {
  let img = emptyData();
  const filler = fillCircle(img);
  const sourceCols = collectColours({ file });

  sourceCols.sort(attributeSorter(sortAttributes)).forEach(sourceCol => {
    const { x, y, s } = sourceCol;
    const size = 1 + (100 - s) / 2;
    filler(x, y, size + 1, BLACK);
    filler(x, y, size, WHITE);
  });

  img = thresholdFill(img, WHITE, 6);
  img = zoomIn(img, zoomAt, zoomAt, 700, 700);
  img.writeOut(__filename, i + 1);
});
