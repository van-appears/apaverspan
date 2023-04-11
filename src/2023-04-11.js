const { distance, loadImg, random } = require("./tools");
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

const src = loadImg("location1.png");
const avgData = avgImgData();
const { width, height } = avgData;

const points = new Array(200).fill(0).map(() => ({
  x: rndInt(width),
  y: rndInt(height)
}));

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
      avgData.set(Math.round(x), Math.round(y), col);
      col = alter(col, diff);
      x += movex;
      y += movey;
    }

    x = from.x - movex;
    y = from.y - movey;
    col = col1;
    while (x > 0 && x < width && y > 0 && y < height) {
      avgData.set(Math.round(x), Math.round(y), col);
      col = alter(col, diff, -1);
      x -= movex;
      y -= movey;
    }
  }
}

avgData.asImg().writeOut(__filename);
