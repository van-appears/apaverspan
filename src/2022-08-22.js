const { codeLetters, colours, emptyData, fillCircle } = require("./tools");
const convert = require("color-convert");

const img = emptyData(colours.WHITE);
const { width, height } = img;
const circle = fillCircle(img);

let currentX = width / 2;
let currentY = height / 2;
let currentDirection = 0;
let currentSize = 60;
let currentMode = 5;

const reduceBlock = () => {
  const half = currentSize / 2;
  circle(
    currentX - half,
    currentY - half,
    (currentSize + currentMode) * 4,
    previous => {
      let { r, g, b } = previous;
      let [h, s, v] = convert.rgb.hsv.raw(r, g, b);
      switch (currentMode) {
        case 4:
          s = Math.min(s + 5, 100);
          break;
        case 5:
          s = Math.max(s - 5, 0);
          break;
        case 6:
          v = Math.min(v + 5, 100);
          break;
        case 7:
          v = Math.max(v - 5, 0);
          break;
        case 8:
          h = (h + 5) % 360;
          break;
        case 9:
          h = (h + 355) % 360;
          break;
      }
      [r, g, b] = convert.hsv.rgb.raw(h, s, v);
      return { r, g, b };
    },
    true
  );
};

codeLetters(__filename).forEach(x => {
  reduceBlock();
  switch (x % 10) {
    case 0:
    case 1:
    case 2:
    case 3:
      currentDirection = x % 10;
      break;
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      currentMode = x % 10;
  }

  switch (currentDirection) {
    case 0:
      currentX += currentSize + currentMode;
      break;
    case 1:
      currentY += currentSize + currentMode;
      break;
    case 2:
      currentX -= currentSize + currentMode;
      break;
    case 3:
      currentY -= currentSize + currentMode;
      break;
  }
});

img.writeOut(__filename);
