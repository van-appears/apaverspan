const { emptyData, codeLetters, colours, fillRect } = require("./tools");
const img = emptyData(colours.WHITE);
const { width, height } = img;
const rect = fillRect(img);

let currentX = width / 2;
let currentY = height / 2;
let currentDirection = 0;
let currentSize = 65;

const reduceBlock = () => {
  const half = currentSize / 2;
  rect(
    currentX - half,
    currentY - half,
    currentSize * 4,
    currentSize * 4,
    previous => {
      const val = Math.max(previous.r - 10, 0);
      return { r: val, g: val, b: val };
    },
    true
  );
};

codeLetters(__filename).forEach(x => {
  reduceBlock();
  switch (x % 5) {
    case 0:
      currentSize += 5;
      break;
    case 1:
    case 2:
    case 3:
      currentDirection = (currentDirection + (x % 6)) % 4;
      break;
    case 4:
      currentSize = Math.max(10, currentSize - 5);
      break;
  }
  switch (currentDirection) {
    case 0:
      currentX += currentSize;
      break;
    case 1:
      currentY += currentSize;
      break;
    case 2:
      currentX -= currentSize;
      break;
    case 3:
      currentY -= currentSize;
      break;
  }
});

img.writeOut(__filename);
