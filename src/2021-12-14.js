const {
  attributeSorter,
  collectColours,
  emptyData,
  loadImg
} = require("./tools");

const img = emptyData();
const { width, height } = img;
const allColours = collectColours({
  img: loadImg("flowers1.png"),
  mode: "column"
});

const pair = (x, y) => [
  // original
  allColours[x][y],
  // rotate 90 clockwise
  allColours[y][width - 1 - x],
  // rotate 180 clockwise
  allColours[width - 1 - x][height - 1 - y],
  // rotate 270 clockwise
  allColours[height - 1 - y][x],

  // flip horizontal
  allColours[width - 1 - x][y],
  // flip horizontal, rotate 90 clockwise
  //allColours[height-1-y][width-1-x],
  // flip horizontal, rotate 180 clockwise
  allColours[x][height - 1 - y],
  // flip horizontal, rotate 270 clockwise
  allColours[y][x]
];

const sorter = attributeSorter(["s", "h", "v"]);
for (x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const keep = pair(x, y).sort(sorter)[0];
    img.set(x, y, keep);
  }
}

img.writeOut(__filename);
