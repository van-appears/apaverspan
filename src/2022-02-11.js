const { drawLine, emptyData, loadImg, collectColours } = require("./tools");

const img = emptyData();
const { width, height } = img;
const line = drawLine(img);

const collectRowDifferences = row => {
  let last = row[0];
  const rowCols = [last];
  for (let x = 1; x < width; x++) {
    const next = row[x];
    if (Math.abs(next.v - last.v) > 23) {
      rowCols.push(next);
    }
    last = next;
  }
  rowCols.push(last);
  return rowCols;
};

["flowers2.png", "shell1.png"].forEach((input, i) => {
  const allColours = collectColours({
    img: loadImg(input),
    mode: "row"
  });

  for (let y = 0; y < height; y++) {
    const rowCols = collectRowDifferences(allColours[y]);
    for (let c = 1; c < rowCols.length; c++) {
      line(rowCols[c - 1].x, y, rowCols[c].x, y, rowCols[c - 1], rowCols[c]);
    }
  }

  img.writeOut(__filename, i + 1);
});
