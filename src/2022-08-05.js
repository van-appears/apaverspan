const {
  colours,
  collectColours,
  emptyData,
  fillCircle,
  loadImg,
  rotations
} = require("./tools");
const { WHITE } = colours;
const { clockwise180, clockwise270 } = rotations;

const edge = (source, size) => {
  const threshold = 30;
  const target = emptyData();
  const { width, height } = source;
  const circle = fillCircle(target);
  const colours = collectColours({
    img: source,
    mode: "row"
  });

  for (let y = 0; y < height; y++) {
    for (let x = 1; x < width; x++) {
      const p = colours[y][x - 1].v;
      const n = colours[y][x].v;
      if (Math.abs(p - n) > threshold) {
        circle(x, y, size, WHITE);
      }
    }
  }

  for (let x = 0; x < width; x++) {
    for (let y = 1; y < height; y++) {
      const p = colours[y - 1][x].v;
      const n = colours[y][x].v;
      if (Math.abs(p - n) > threshold) {
        circle(x, y, size, WHITE);
      }
    }
  }

  return target;
};

const img1 = clockwise270(edge(edge(edge(loadImg("shell1.png"), 25), 14), 3));
img1.writeOut(__filename, 1);

const img2 = clockwise180(edge(edge(edge(loadImg("flowers2.png"), 19), 11), 3));
img2.writeOut(__filename, 2);
