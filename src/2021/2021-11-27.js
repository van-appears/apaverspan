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
  file: "trees1.png",
  xlimit: width,
  ylimit: height
}).sort(attributeSorter(["v", "s", "h"]));

const maxV = sourceCols.slice(-1)[0].v;
const sizeFns = [v => 1 + (maxV - v) / 2, v => v / 2];

sizeFns.forEach((sizeFn, i) => {
  sourceCols.forEach(sourceCol => {
    const { x, y, v } = sourceCol;
    const size = sizeFn(v);
    filler(x, y, size, sourceCol);
  });

  img.writeOut(__filename, i + 1);
});
