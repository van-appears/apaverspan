const { constants, colours, emptyData, loadImg } = require("./tools");
const colourDistance = require("./process/colour-distance");

const img = emptyData();
const allSrc = constants.ALL_FILES.map(file => loadImg(file));
const { width, height } = img;

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const allCols = allSrc.map(src => src.get(x, y));
    const avg = colours.avg(false, ...allCols);
    const dist = colourDistance(avg);

    const pick = allCols
      .map(col => ({ ...col, d: dist(col) }))
      .sort((a, b) => a.d - b.d)[0];

    img.set(x, y, pick);
  }
}

img.writeOut(__filename);
