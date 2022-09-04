const { emptyData } = require("./tools");
const collectGroupedColours = require("./process/collect-grouped-colours");

const img = emptyData();
const hsMap = collectGroupedColours({
  file: "flowers1.png",
  attributes: ["h", "s"]
});

Object.values(hsMap).forEach(colGroup => {
  const len = colGroup.length;
  const avgX = colGroup.reduce((acc, col) => acc + col.x, 0) / len;
  const avgY = colGroup.reduce((acc, col) => acc + col.y, 0) / len;
  colGroup.forEach(({ x, y, ...col }) => {
    img.set(Math.round((avgX + x) / 2), Math.round((avgY + y) / 2), col);
  });
});

img.writeOut(__filename);
