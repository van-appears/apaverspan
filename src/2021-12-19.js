const {
  attributeSorter,
  collectColours,
  emptyData,
  loadImg
} = require("./tools");

const img = emptyData();
const { width, height } = img;
const sorter = attributeSorter(["g", "b", "r"]);

const allColours = collectColours({
  img: loadImg("location1.png"),
  mode: "column"
});

const pair = (x, y) => [allColours[x][y], allColours[y][width - 1 - x]];

for (x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const keep = pair(x, y).sort(sorter)[0];
    img.set(x, y, keep);
  }
}

img.writeOut(__filename);
