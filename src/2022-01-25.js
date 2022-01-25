const { attributeSorter, emptyData, loadImg } = require("./tools");
const processor = require("./process/sort-images-around-point");

const img = emptyData();
processor({
  img,
  sources: [loadImg("flowers1.png"), loadImg("flowers3.png")],
  centreX: 500.1,
  centreY: 400.1,
  colourSorter: attributeSorter(["s", "v", "h"], true)
});

img.writeOut(__filename);
