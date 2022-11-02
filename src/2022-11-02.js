const { asNum, colours, emptyData, loadImg, random } = require("./tools");
const fillDirectionRadian = require("./process/fill-direction-radian");

const { val } = random(asNum(__filename));
const FULL_ROT = Math.PI * 2;
const QUARTER_ROT = Math.PI / 2;
const source = loadImg("flowers1.png");
const { width, height } = source;
const mixer = colours.mix(90, 10);

[
  { x: 500, y: 400 },
  { x: 700, y: 700 },
  { x: 1100, y: 800 },
  { x: 600, y: 900 }
].forEach((centre, i) => {
  const img = emptyData(source.get(centre.x, centre.y));
  const fillDirection = fillDirectionRadian(img);

  let radian = 0;
  for (let loop = 0; loop < 10; loop++) {
    const extend = (centreX, centreY, adjust) => {
      let newX = centreX;
      let newY = centreY;
      while (newX > 0 && newX < width && newY > 0 && newY < height) {
        newX += Math.sin(radian + adjust);
        newY += Math.cos(radian + adjust);
      }
      return { x: newX, y: newY };
    };

    let dist = 50;
    let col = true;
    while (col) {
      radian = radian + val(QUARTER_ROT) + QUARTER_ROT / 2;
      if (radian > FULL_ROT) {
        radian -= FULL_ROT;
        dist += 50;
      }

      const radX = centre.x + dist * Math.sin(radian);
      const radY = centre.y + dist * Math.cos(radian);
      const { x: x1, y: y1 } = extend(radX, radY, QUARTER_ROT);
      const { x: x2, y: y2 } = extend(radX, radY, -QUARTER_ROT);

      col = source.get(radX, radY);
      const colourFn = prev => prev && col && mixer(prev, col);
      fillDirection(x1, y1, x2, y2, radian, colourFn);
    }
  }

  img.writeOut(__filename, i + 1);
});
