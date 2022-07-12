const {
  emptyData,
  loadImg,
  collectColours,
  attributeSorter
} = require("./tools");

const img = emptyData();
const { width, height } = img;
const sourceColourRows = collectColours({
  img: loadImg("view1.png"),
  xlimit: width,
  ylimit: height,
  mode: "row"
});

const sorter = attributeSorter(["v", "s", "h"]);
const half = width / 2;

for (let y = 0; y < height; y++) {
  const row1 = sourceColourRows[y];
  const row2 = row1.splice(0, half);
  row1.sort(sorter);
  row2.sort(sorter).reverse();
  for (let x = 0; x < row1.length; x++) {
    img.set(x, y, row1[x]);
    img.set(x + half, y, row2[x]);
  }
}

img.writeOut(__filename);
