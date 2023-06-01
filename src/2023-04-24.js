const { colours, distance, emptyData, loadImg, random } = require("./tools");
const avgImgData = require("./process/avg-img-data");
const { rndInt } = random(__filename);

const limitColAttr = a => Math.min(255, Math.max(0, a));
const alter = (col, change, mult = 1) => ({
  r: limitColAttr(col.r + change.r * mult),
  g: limitColAttr(col.g + change.g * mult),
  b: limitColAttr(col.b + change.b * mult)
});
const colDiff = (col1, col2, dist) => ({
  r: (col2.r - col1.r) / dist,
  g: (col2.g - col1.g) / dist,
  b: (col2.b - col1.b) / dist
});

const rnd = () => rndInt(31) - 15;
const src = loadImg("flowers2.png");

[
  [200, 1000],
  [300, 300],
  [500, 500],
  [400, 600],
  [900, 300],
  [600, 400]
].forEach(([xo, yo], i) => {
  const img = emptyData();
  const avgImg = avgImgData();
  const { width, height } = img;

  const points = new Array();
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      points.push({ x: xo + rnd() + 32 * x, y: yo + rnd() + 32 * y });
    }
  }

  for (let outer = 0; outer < points.length - 1; outer++) {
    for (let inner = outer + 1; inner < points.length; inner++) {
      const from = points[outer];
      const to = points[inner];

      const dist = distance(from, to);
      const diffx = to.x - from.x;
      const diffy = to.y - from.y;
      const movex = diffx / Math.max(Math.abs(diffx), Math.abs(diffy));
      const movey = diffy / Math.max(Math.abs(diffx), Math.abs(diffy));
      const col1 = src.get(from.x, from.y);
      const col2 = src.get(to.x, to.y);
      const diff = colDiff(col1, col2, dist);

      let x = from.x;
      let y = from.y;
      let col = col1;
      while (x > 0 && x < width && y > 0 && y < height) {
        avgImg.set(Math.round(x), Math.round(y), col);
        col = alter(col, diff);
        x += movex;
        y += movey;
      }

      x = from.x - movex;
      y = from.y - movey;
      col = col1;
      while (x > 0 && x < width && y > 0 && y < height) {
        avgImg.set(Math.round(x), Math.round(y), col);
        col = alter(col, diff, -1);
        x -= movex;
        y -= movey;
      }
    }
  }

  for (let x = 0; x < width; x++) {
    for (let y = 1; y < height; y++) {
      if (avgImg.get(x, y).c === 0) {
        avgImg.set(x, y, avgImg.get(x, y - 1));
      }
    }
  }

  avgImg.asImg().writeOut(__filename, i + 1);
});
