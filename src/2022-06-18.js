const {
  attributeSorter,
  emptyData,
  loadImg,
  partialRotate
} = require("./tools");
const sorter = attributeSorter(["r", "g", "b"]);

const img = emptyData();
const { width, height } = img;
const source = loadImg("trees1.png");
const rots = [
  partialRotate(source, 700, 700, 700, 700, 0.3),
  partialRotate(source, 700, 700, 700, 700, 0.27),
  partialRotate(source, 700, 700, 700, 700, 0.21),
  partialRotate(source, 700, 700, 700, 700, 0.09),
  partialRotate(source, 700, 700, 700, 700, -0.06),
  partialRotate(source, 700, 700, 700, 700, -0.24)
];

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const colours = rots.map(rot => rot.get(x, y)).sort(sorter);
    img.set(x, y, colours[0]);
  }
}

img.writeOut(__filename);
