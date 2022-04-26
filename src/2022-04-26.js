const {
  attributeSorter,
  emptyData,
  loadImg,
  collectColours
} = require("./tools");
const img = emptyData();
const { height, width } = img;

["location1.png", "trees1.png", "shell1.png"].forEach((file, i) => {
  const source = loadImg(file);
  const allColours = collectColours({ img: source }).sort(
    attributeSorter(["v", "h", "s"])
  );

  allColours
    .map(({ x, y }, i) => {
      const moved = allColours[(i + 600000) % allColours.length];
      return { ...moved, x, y };
    })
    .forEach(({ x, y, ...col }) => {
      img.set(x, y, col);
    });

  img.writeOut(__filename, i + 1);
});
