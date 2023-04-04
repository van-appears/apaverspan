const { attributeSorter, emptyData, loadImg } = require("../tools");
const processor = require("../process/sort-images-around-point");

["flowers1.png", "flowers3.png", "flowers4.png", "flowers2.png"].forEach(
  (x, i) => {
    const img = emptyData();
    processor({
      img,
      sources: [loadImg(x)],
      centreX: 825 + i * 50,
      centreY: 300,
      colourSorter: attributeSorter(["v", "h", "s"], true)
    });

    img.writeOut(__filename, i + 1);
  }
);
