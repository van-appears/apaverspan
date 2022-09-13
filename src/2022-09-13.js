const { asNum, colours, emptyData, random } = require("./tools");
const collectGroupedColours = require("./process/collect-grouped-colours");
const findEmptyLocationOnPath = require("./process/find-empty-location-on-path");
const { BLACK, MAGENTA, replaceAll } = colours;
const { shuffle } = random(asNum(__filename));

["flowers1.png", "flowers2.png"].forEach((file, i) => {
  const img = emptyData(MAGENTA);
  const findEmptyLocation = findEmptyLocationOnPath(img, MAGENTA);
  const svMap = collectGroupedColours({ file, attributes: ["s", "v"] });

  Object.values(svMap)
    .sort((a, b) => b.length - a.length)
    .filter(colGroup => colGroup.length > 1)
    .forEach(colGroup => {
      shuffle(colGroup);

      let last = colGroup[0];
      for (let colIndex = 1; colIndex < colGroup.length; colIndex++) {
        const col = colGroup[colIndex];
        const found = findEmptyLocation(col, last);
        if (found) {
          img.set(found.x, found.y, col);
          last = found;
        }
      }
    });

  replaceAll(img, MAGENTA, BLACK);
  img.writeOut(__filename, i + 1);
});
