const { collectColours, distance } = require("../tools");

module.exports = function (opts) {
  const { img, colourSorter, sources } = opts;
  const { width, height } = img;
  const { centreX = width / 2, centreY = height / 2 } = opts;

  const indexAsPoint = i => {
    const x = Math.floor(i / width);
    const y = i % width;
    const d = distance(x, y, centreX, centreY);
    return { x, y, d };
  };

  const allCols = sources
    .reduce((acc, source) => acc.concat(collectColours({ img: source })), [])
    .sort(colourSorter);

  new Array(width * height)
    .fill(0)
    .map((_, i) => indexAsPoint(i))
    .sort((a, b) => a.d - b.d)
    .forEach(({ x, y }, i) => {
      img.set(x, y, allCols[i]);
    });
};
