const { collectColours, drawLine, emptyData } = require("./tools");
const img = emptyData();
const line = drawLine(img);

const asKey = ({ r, g, b }) => `${r}_${g}_${b}`;
const distance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);

const colourGroups = collectColours({ file: "location1.png" }).reduce(
  (acc, col) => {
    const key = asKey(col);
    const group = (acc[key] = acc[key] || []);
    group.push(col);
    return acc;
  },
  {}
);

Object.values(colourGroups)
  .sort((a, b) => b.length - a.length)
  .filter((_, n) => n % 100 === 0)
  .forEach(group => {
    group.sort(distance);
    for (let j = 0; j < group.length - 1; j++) {
      line(group[j].x, group[j].y, group[j + 1].x, group[j + 1].y, group[j]);
    }
  });

img.writeOut(__filename);
