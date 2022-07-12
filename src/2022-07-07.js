const { collectColours, emptyData } = require("./tools");

const img = emptyData();
const vsMap = collectColours({ file: "trees1.png" }).reduce((acc, col) => {
  const { s, v } = col;
  const key = `${v}_${s}`;
  const collected = (acc[key] = acc[key] || []);
  collected.push(col);
  return acc;
}, {});

Object.values(vsMap).forEach(colGroup => {
  const len = colGroup.length;
  const avgX = colGroup.reduce((acc, col) => acc + col.x, 0) / len;
  const avgY = colGroup.reduce((acc, col) => acc + col.y, 0) / len;
  colGroup.forEach(({ x, y, ...col }) => {
    img.set(Math.round((avgX + x) / 2), Math.round((avgY + y) / 2), col);
  });
});

img.writeOut(__filename);
