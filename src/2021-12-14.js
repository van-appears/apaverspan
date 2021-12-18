const { attributeSorter, collectColours, emptyData, loadImg } = require("./tools");

const img = emptyData();
const { width, height } = img;
const allColours = collectColours({
  img: loadImg("flowers1.png"),
  mode: "column"
});

const pair = (x, y) => [
  allColours[x][y],                  // original
  allColours[y][width-1-x],          // rotate 90 clockwise
  allColours[width-1-x][height-1-y], // rotate 180 clockwise
  allColours[height-1-y][x],         // rotate 270 clockwise

  allColours[width-1-x][y],          // flip horiz
  //allColours[height-1-y][width-1-x], // flip horiz, rotate 90 clockwise
  allColours[x][height-1-y],         // flip horiz, rotate 180 clockwise
  allColours[y][x]                   // flip horiz, rotate 270 clockwise
];

const sorter = attributeSorter(["s", "h", "v"]);
for (x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const keep = pair(x, y).sort(sorter)[0];
    img.set(x, y, keep);
  }
}

img.writeOut(__filename);
