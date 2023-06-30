const { constants, loadImg, emptyData, rotations } = require("./tools");

[2.0, 0.5].forEach((ratio, i) => {
  let current = loadImg("location1.png");
  let previous = null;

  for (let loop = 0; loop < 16; loop++) {
    previous = current;
    current = emptyData();
    const { width, height } = current;
    for (let y = 0; y < height; y++) {
      const offset = Math.round(width * Math.pow(y / width, ratio));
      for (let x = 0; x < width; x++) {
        current.set((x + offset) % width, y, previous.get(x, y));
      }
    }

    current = rotations.clockwise90(current);
  }

  current.writeOut(__filename, i + 1);
});
