const {
  attributeSorter,
  collectColours,
  emptyData,
  zoomIn
} = require("./tools");

["location1.png", "shell1.png"].forEach((file, i) => {
  const img = emptyData();
  const { width, height } = img;

  collectColours({ file })
    .sort(attributeSorter(["v", "h", "s"]))
    .forEach((col, index) => {
      const x = index % width;
      const y = Math.floor(index / width);
      img.set(x, y, col);
    });

  zoomIn(
    img,
    (width * 1) / 8,
    (height * 1) / 4,
    (width * 3) / 4,
    (height * 3) / 4
  ).writeOut(__filename, i + 1);
});
