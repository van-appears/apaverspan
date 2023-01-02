const { colours, emptyData, fillRect, random } = require("../tools");
const rnd = random(__filename);
const { YELLOW, BLACK, mix } = colours;
const BRICK_HEIGHT = 20;
const mixer = mix(3, 1);

function createRow(width) {
  const row = [];
  let x = 0;
  while (x < width) {
    const brick = {
      col: YELLOW,
      start: x,
      length: 15 + rnd.int(11)
    };
    if (x + brick.length > width) {
      brick.length = width - brick.start;
    }
    x += brick.length;
    row.push(brick);
  }

  const first = row[0];
  const last = row[row.length - 1];
  const avg = (first.length + last.length) / 2;
  const diff = Math.floor(avg) - first.length;
  first.length = Math.floor(avg);
  last.length = Math.ceil(avg);
  for (let index = 1; index < row.length; index++) {
    row[index].start += diff;
  }
  return row;
}

function createBricks(width, height) {
  const bricks = [];
  for (let row = 0; row < height / BRICK_HEIGHT; row++) {
    bricks.push(createRow(width));
  }
  return bricks;
}

function scroll(mixColor) {
  let row = bricks[0];
  let brick = rnd.item(row);
  brick.col = mixer(brick.col, mixColor);
  for (let y = 1; y < bricks.length; y++) {
    row = bricks[y].filter(x => overlapX(x, brick));
    if (row.length === 0) {
      break;
    }
    brick = rnd.item(row);
    brick.col = mixer(brick.col, mixColor);
  }
}

function overlapX(currentBrick, lastBrick) {
  const currentBrickStart = currentBrick.start;
  const currentBrickEnd = currentBrick.start + currentBrick.length;
  const lastBrickStart = lastBrick.start;
  const lastBrickEnd = lastBrick.start + lastBrick.length;
  return currentBrickEnd > lastBrickStart && currentBrickStart < lastBrickEnd;
}

const img = emptyData();
const { width, height } = img;
const bricks = createBricks(width, height);
for (var loop = 0; loop < 666; loop++) {
  scroll(loop % 3 == 0 ? BLACK : YELLOW);
}
const filler = fillRect(img);
bricks.forEach((row, index) =>
  row.forEach(brick => {
    filler(
      brick.start,
      index * BRICK_HEIGHT,
      brick.length,
      BRICK_HEIGHT,
      brick.col
    );
  })
);

img.writeOut(__filename);
