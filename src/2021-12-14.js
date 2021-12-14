const { attributeSorter, collectColours, emptyData, loadImg } = require("./tools");

const img = emptyData();
const { width, height } = img;
const allColours = collectColours({
  img: loadImg("flowers1.png"),
  mode: "row"
});

const pair = (x, y) => [
  allColours[y][x],
  allColours[x][y],
  allColours[height-1-y][x],
  allColours[x][height-1-y],
  allColours[y][width-1-x],
  allColours[width-1-x][y],
  allColours[height-1-y][width-1-x],
  //allColours[width-1-x][height-1-y]
];

const sorter = attributeSorter(["s", "h", "v"]);
for (x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const keep = pair(x, y).sort(sorter)[0];
    img.set(x, y, keep);
  }
}

img.writeOut(__filename);
