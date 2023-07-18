const { fillCircle, emptyData, rotations } = require("./tools");

let previous = null;
let current = emptyData();
const { width, height } = current;

for (let x = 255; x >= 0; x--) {
  const col = { r: x, g: x, b: 0 };
  fillCircle(current, 540, 540, 2 + x * 2, col);
  fillCircle(current, 1100, 1140, 1 + x, col);
}

for (let loop = 0; loop < 8; loop++) {
  previous = current;
  current = emptyData();
  for (let y = 0; y < height; y++) {
    const offset = Math.round(
      width * 0.7 * Math.sin((Math.PI * 0.7 * y) / width)
    );
    for (let x = 0; x < width; x++) {
      current.set((x + offset) % width, y, previous.get(x, y));
    }
  }

  current =
    loop % 3 ? rotations.clockwise90(current) : rotations.clockwise180(current);
}

current.writeOut(__filename);
