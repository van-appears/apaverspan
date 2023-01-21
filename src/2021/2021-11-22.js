const {
  attributeSorter,
  emptyData,
  fillCircle,
  collectColours
} = require("../tools");

const img = emptyData();
const filler = fillCircle(img);
const { width, height } = img;
const sourceCols = collectColours({
  file: "flowers2.png",
  xlimit: width,
  ylimit: height
});

const sortAttributes = [
  ["v", "s", "h"],
  ["s", "v", "h"]
];

sortAttributes.forEach((attributes, i) => {
  sourceCols.sort(attributeSorter(attributes, true)).forEach(sourceCol => {
    const { x, y, v } = sourceCol;
    const size = 1 + (100 - v) / 2;
    filler(x, y, size, sourceCol);
  });

  img.writeOut(__filename, i + 1);
});
