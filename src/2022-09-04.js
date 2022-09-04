const { colours, emptyData } = require("./tools");
const collectGroupedColours = require("./process/collect-grouped-colours");
const { BLACK, MAGENTA } = colours;

["shell1.png", "flowers4.png", "trees1.png", "flowers1.png"].forEach(
  (file, i) => {
    const img = emptyData(MAGENTA);
    const { width, height } = img;
    const hsMap = collectGroupedColours({ file, attributes: ["h", "s"] });

    Object.values(hsMap)
      .sort((a, b) => b.length - a.length)
      .forEach(colGroup => {
        const len = colGroup.length;
        const avgX = colGroup.reduce((acc, col) => acc + col.x, 0) / len;
        const avgY = colGroup.reduce((acc, col) => acc + col.y, 0) / len;

        for (let colIndex = 0; colIndex < len; colIndex++) {
          let col = colGroup[colIndex];
          let distX = col.x - avgX;
          let distY = col.y - avgY;
          let dist = Math.max(Math.abs(distX), Math.abs(distY));
          for (let move = 0; move <= dist; move++) {
            let testX = Math.round(avgX + (distX * move) / dist);
            let testY = Math.round(avgY + (distY * move) / dist);
            let test = img.get(testX, testY);
            if (MAGENTA.equals(test)) {
              img.set(testX, testY, col);
              break;
            }
          }
        }
      });

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (MAGENTA.equals(img.get(x, y))) {
          img.set(x, y, BLACK);
        }
      }
    }

    img.writeOut(__filename, i + 1);
  }
);
