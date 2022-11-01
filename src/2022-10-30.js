const { asNum, emptyData, loadImg, random } = require("./tools");
const fillDirectionRadian = require("./process/fill-direction-radian");

const { val } = random(asNum(__filename));
const FULL_ROT = Math.PI * 2;
const QUARTER_ROT = Math.PI / 2;
const files = ["flowers2.png", "flowers4.png", "location1.png", "shell1.png"];
let radian = 0;

files.forEach((file, i) => {
  const source = loadImg(file);
  const { width, height } = source;
  const img = emptyData(source.get(width / 2, height / 2));
  const fillDirection = fillDirectionRadian(img);

  const extend = (centreX, centreY, adjust) => {
    let newX = centreX;
    let newY = centreY;
    while (newX > 0 && newX < width && newY > 0 && newY < height) {
      newX += Math.sin(radian + adjust);
      newY += Math.cos(radian + adjust);
    }
    return { x: newX, y: newY };
  };

  let dist = 100;
  let col = true;
  while (col) {
    radian = radian + val(QUARTER_ROT) + QUARTER_ROT / 2;
    if (radian > FULL_ROT) {
      radian -= FULL_ROT;
      dist += 100;
    }

    const radX = width / 2 + dist * Math.sin(radian);
    const radY = height / 2 + dist * Math.cos(radian);
    const { x: x1, y: y1 } = extend(radX, radY, QUARTER_ROT);
    const { x: x2, y: y2 } = extend(radX, radY, -QUARTER_ROT);

    col = source.get(radX, radY);
    if (col) {
      fillDirection(x1, y1, x2, y2, radian, col);
    }
  }

  img.writeOut(__filename, i + 1);
});
