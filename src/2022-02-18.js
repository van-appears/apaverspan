const {
  attributeSorter,
  emptyData,
  drawLine,
  loadImg,
  collectColours
} = require("./tools");

["shell1.png", "flowers1.png", "location1.png", "flowers2.png"].forEach(
  (input, i) => {
    const source = loadImg(input);
    const cols = collectColours({
      img: source
    }).sort(attributeSorter(["y", "s", "v", "h"]));

    const img = emptyData();
    const { width, height } = img;
    const line = drawLine(img);

    const fill = (x, y, col) => {
      const endCol = source.get(x, height - 1);
      for (let i = -10; i < 11; i++) {
        line(x + i, y, x + i, height - 1, col, endCol);
      }
    };

    for (let i = 0; i < cols.length; i += width + 1) {
      const { x, y, ...col } = cols[i];
      fill(x, y, col);
    }

    img.writeOut(__filename, i + 1);
  }
);
