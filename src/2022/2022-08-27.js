const { convert, distance, loadImg, zoomIn } = require("../tools");
const collectGroupedColours = require("../process/collect-grouped-colours");

const img = loadImg("flowers3.png");
const hsMap = collectGroupedColours({ img, attributes: ["h", "s"] });

Object.values(hsMap).forEach(colGroup => {
  const len = colGroup.length;
  const avgX = colGroup.reduce((acc, col) => acc + col.x, 0) / len;
  const avgY = colGroup.reduce((acc, col) => acc + col.y, 0) / len;

  const distCols = colGroup
    .map(({ x, y, ...cols }) => ({
      x,
      y,
      dist: distance(x, y, avgX, avgY),
      ...cols
    }))
    .sort((a, b) => a.dist - b.dist);

  const shortDist = distCols[0].dist;
  const longDist = distCols[distCols.length - 1].dist;
  distCols.forEach(({ x, y, r, g, b, h, dist }) => {
    const scalar = (dist - shortDist) / (longDist - shortDist);
    if (scalar) {
      const newVS = 100 * scalar;
      const newCol = convert.colFromHsv(h, newVS, newVS);
      img.set(x, y, newCol);
    } else {
      img.set(x, y, { r, g, b });
    }
  });
});

zoomIn(img, 0, 0, 800, 800).writeOut(__filename);
