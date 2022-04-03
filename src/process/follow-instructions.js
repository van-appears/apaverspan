const { colours, drawLine } = require("../tools");
const mixer = colours.mix(0.9, 0.1);
const TWO_PI = Math.PI * 2.0;
const HALF_PI = Math.PI / 2.0;
const DIST = 10.0;
const WIDTHS = [ 0, -1, 1, -2, 2 ];

const MOVE = ({ x, y, radian, lineWidth }) => ({
  newX: x + ((DIST + lineWidth) * Math.sin(radian)),
  newY: y + ((DIST + lineWidth) * Math.cos(radian))
});

const DOUBLE_MOVE = ({ x, y, ...others }) => {
  const { newX, newY } = MOVE({ x, y, ...others });
  return MOVE({ x: newX, y: newY, ...others });
};

const TURN_CLOCKWISE = ({ radian, ...others }) => {
  const newRadian = (radian + TWO_PI - TWO_PI / 11) % TWO_PI;
  const moved = MOVE({ radian: newRadian, ...others });
  return { ...moved, newRadian };
};

const DOUBLE_TURN_CLOCKWISE = ({ radian, ...others }) => {
  const newRadian = (radian + TWO_PI - TWO_PI / 5.5) % TWO_PI;
  const moved = MOVE({ radian: newRadian, ...others });
  return { ...moved, newRadian };
};

const TURN_ANTICLOCKWISE = ({ radian, ...others }) => {
  const newRadian = (radian + TWO_PI / 11) % TWO_PI;
  const moved = MOVE({ radian: newRadian, ...others });
  return { ...moved, newRadian };
};

const DOUBLE_TURN_ANTICLOCKWISE = ({ radian, ...others }) => {
  const newRadian = (radian + TWO_PI / 5.5) % TWO_PI;
  const moved = MOVE({ radian: newRadian, ...others });
  return { ...moved, newRadian };
};

const UP = ({ x, y, lineWidth }) => ({ newX: x, newY: y - DIST - lineWidth });

const DOWN = ({ x, y, lineWidth }) => ({ newX: x, newY: y + DIST + lineWidth });

const LEFT = ({ x, y, lineWidth }) => ({ newX: x - DIST - lineWidth, newY: y });

const RIGHT = ({ x, y, lineWidth }) => ({ newX: x + DIST + lineWidth, newY: y });

const INCREASE_WIDTH = ({ lineWidth }) => {
  return { newLineWidth: Math.min(lineWidth + 1, WIDTHS.length) };
};

const DECREASE_WIDTH = ({ lineWidth }) => {
  return { newLineWidth: Math.max(lineWidth - 1, 1) };
};

const MIX_COL = ({ x, y, col, source }) => {
  return { newCol: mixer(col, source.get(x, y)) };
};

const DEFAULT_INSTRUCTIONS = [
  TURN_CLOCKWISE,
  DOUBLE_TURN_CLOCKWISE,
  TURN_ANTICLOCKWISE,
  DOUBLE_TURN_ANTICLOCKWISE,
  MOVE,
  DOUBLE_MOVE,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  INCREASE_WIDTH,
  DECREASE_WIDTH,
  MIX_COL
];

const DEFAULT_MAP = col => (col.r * DEFAULT_INSTRUCTIONS.length) / 255;

const run = function ({
  instructions = DEFAULT_INSTRUCTIONS,
  mapCol = DEFAULT_MAP,
  source,
  data,
  img,
  startx,
  starty
}) {
  const { width, height } = img;
  const line = drawLine(img);
  const wrapX = xx => (xx < 0 ? xx + width : xx > width ? xx - width : xx);
  const wrapY = yy => (yy < 0 ? yy + height : yy > height ? yy - height : yy);
  let lineWidth = 1;
  let x = startx !== undefined ? startx : width / 2;
  let y = starty !== undefined ? starty : height - 1;
  let radian = Math.PI;
  let col = source.get(x, y);

  data.forEach(item => {
    const instruction = instructions[Math.floor(mapCol(item)) % instructions.length];
    const input = { x, y, radian, col, source, lineWidth };
    let { newX, newY, newRadian, newCol, newLineWidth } = instruction(input);

    if (newX !== undefined && newY !== undefined) {
      let copyX = newX, copyY = newY;
      for (let w=0; w<lineWidth; w++) {
        const offsetX = WIDTHS[w] * Math.sin(radian + HALF_PI);
        const offsetY = WIDTHS[w] * Math.cos(radian + HALF_PI);
        line(x + offsetX, y + offsetY, newX + offsetX, newY + offsetY, col);
      }

      if (newX < 0) {
        x = newX + width;
        copyX += width;
      } else if (newX >= width) {
        x = newX - width;
        copyX -= width;
      } else {
        x = newX;
      }
      if (newY < 0) {
        y = newY + height;
        copyY += height;
      } else if (newY >= height) {
        y = newY - height;
        copyY -= height;
      } else {
        y = newY;
      }

      for (let w=0; w<lineWidth; w++) {
        const offsetX = WIDTHS[w] * Math.sin(radian + HALF_PI);
        const offsetY = WIDTHS[w] * Math.cos(radian + HALF_PI);
        line(x + offsetX, y + offsetY, copyX + offsetX, copyY + offsetY, col);
      }
    }

    if (newRadian) {
      radian = newRadian;
    }
    if (newCol) {
      col = newCol;
    }
    if (newLineWidth) {
      lineWidth = newLineWidth;
    }
  });
};

module.exports = {
  TURN_CLOCKWISE,
  DOUBLE_TURN_CLOCKWISE,
  TURN_ANTICLOCKWISE,
  DOUBLE_TURN_ANTICLOCKWISE,
  MOVE,
  DOUBLE_MOVE,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  INCREASE_WIDTH,
  DECREASE_WIDTH,
  MIX_COL,
  run
};

