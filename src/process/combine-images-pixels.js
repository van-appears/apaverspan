const { collectColours, emptyData, loadImg } = require("../tools");

module.exports = function ({ sources, files, combiner }) {
  const useSources = sources || files.map(f => loadImg(f));
  const img = emptyData();
  const { width, height } = img;

  const colourGroups = useSources.map(s =>
    collectColours({
      img: s,
      mode: "column"
    })
  );

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pixels = colourGroups.map(g => g[x][y]);
      img.set(x, y, combiner(pixels));
    }
  }
  return img;
};
