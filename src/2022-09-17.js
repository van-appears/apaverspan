const { asNum, colours, emptyData, random } = require("./tools");
const collectGroupedColours = require("./process/collect-grouped-colours");
const findEmptyLocationOnPath = require("./process/find-empty-location-on-path");
const { BLACK, MAGENTA, replaceAll } = colours;
const { shuffle } = random(asNum(__filename));

const rules = [
  { file: "flowers2.png", attributes: ["s"], sortOrder: false },
  { file: "shell1.png", attributes: ["v"], sortOrder: true },
  { file: "flowers1.png", attributes: ["h"], sortOrder: false },
  { file: "flowers4.png", attributes: ["v"], sortOrder: false },
  { file: "trees1.png", attributes: ["h", "s"], sortOrder: true },
  { file: "location1.png", attributes: ["v"], sortOrder: false }
];

rules.forEach((rule, i) => {
  const { attributes, file, sortOrder } = rule;
  const img = emptyData(MAGENTA);
  const findEmptyLocation = findEmptyLocationOnPath(img, MAGENTA);
  const attrMap = collectGroupedColours({ file, attributes });

  Object.values(attrMap)
    .sort((a, b) => (sortOrder ? b.length - a.length : a.length - b.length))
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
