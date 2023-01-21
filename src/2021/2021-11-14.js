const { emptyData, collectColours, attributeSorter } = require("../tools");

const img = emptyData();
const { width, height } = img;
const sourceColourRows = collectColours({
  file: "flowers1.png",
  xlimit: width,
  ylimit: height,
  mode: "row"
});

const sorter = attributeSorter(["h", "s", "v"], true);
const half = width / 2;

for (let y = 0; y < width; y++) {
  const row = sourceColourRows[y];
  row.sort(sorter);
  let counter = 0;
  for (let x = 0; x < half; x++) {
    img.set(x, y, row[counter++]);
    img.set(width - 1 - x, y, row[counter++]);
  }
}

img.writeOut(__filename);
