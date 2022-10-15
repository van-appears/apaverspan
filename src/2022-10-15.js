const {
  asNum,
  drawLine,
  emptyData,
  loadImg,
  random,
  zoomIn
} = require("./tools");
const { int, rndCol } = random(asNum(__filename));
const img = emptyData();
const { width, height } = img;
const line = drawLine(img);

const props = [
  { file: "flowers4.png", zoomX: 0, zoomY: 700 },
  { file: "trees1.png", zoomX: 0, zoomY: 350 },
  { file: "flowers1.png", zoomX: 400, zoomY: 400 },
  { file: "shell1.png", zoomX: 700, zoomY: 50 }
];

props.forEach(({ file, zoomX, zoomY }, i) => {
  const cols = new Array(3).fill(0).map(rndCol);
  const bestMatch = col => {
    const diff = x =>
      Math.abs(x.r - col.r) + Math.abs(x.g - col.g) + Math.abs(x.b - col.b);
    return cols.sort((a, b) => diff(a) - diff(b))[0];
  };

  const source = loadImg(file);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      img.set(x, y, bestMatch(source.get(x, y)));
    }
  }

  for (let index = 0; index < 50000; index++) {
    const startx = 5 + int(width - 10);
    const starty = int(height - 50);
    const endx = startx + int(10) - 5;
    const endy = starty + 50;
    const fromCol = img.get(startx, starty);
    const toCol = source.get(endx, endy);
    line(startx, starty, endx, endy, fromCol, toCol);
  }

  zoomIn(img, zoomX, zoomY, 700, 700, true).writeOut(__filename, i + 1);
});
