const { colours, emptyData, rotations, zoomIn } = require("./tools");
const collectGroupedColours = require("./process/collect-grouped-colours");
const findEmptyLocationOnPath = require("./process/find-empty-location-on-path");
const { BLACK, MAGENTA, replaceAll } = colours;

const img = emptyData(MAGENTA);
const sMap = collectGroupedColours({ file: "flowers3.png", attributes: ["s"] });
const findEmptyLocation = findEmptyLocationOnPath(img, MAGENTA);

Object.values(sMap)
  .sort((a, b) => b.length - a.length)
  .forEach(colGroup => {
    const len = colGroup.length;
    const avgX = colGroup.reduce((acc, col) => acc + col.x, 0) / len;
    const avgY = colGroup.reduce((acc, col) => acc + col.y, 0) / len;

    for (let colIndex = 0; colIndex < len; colIndex++) {
      const col = colGroup[colIndex];
      const found = findEmptyLocation(col, { x: avgX, y: avgY });
      if (found) {
        img.set(found.x, found.y, col);
      }
    }
  });

replaceAll(img, MAGENTA, BLACK);

rotations
  .clockwise180(zoomIn(img, 300, 300, 550, 550, true))
  .writeOut(__filename);
