const {
  attributeSorter,
  collectColours,
  emptyData,
  rotations
} = require("../tools");

const img = emptyData();
const { width, height } = img;
const remap = rotations.remap(img);
const allColours = collectColours({
  file: "flowers1.png",
  mode: "column"
});

const getColour = (remapFn, x, y) => {
  const pixel = remapFn(x, y);
  return allColours[pixel.x][pixel.y];
};

const group = (x, y) => [
  allColours[x][y],
  getColour(remap.clockwise90, x, y),
  getColour(remap.clockwise180, x, y),
  getColour(remap.clockwise270, x, y),
  getColour(remap.flipHorizontal, x, y),
  getColour(remap.clockwise90FlipHorizontal, x, y),
  getColour(remap.clockwise180FlipHorizontal, x, y)
];

const sorter = attributeSorter(["s", "h", "v"]);
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const keep = group(x, y).sort(sorter)[0];
    img.set(x, y, keep);
  }
}

img.writeOut(__filename);
