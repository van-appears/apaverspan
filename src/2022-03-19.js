const { asNum, loadImg, random, zoomIn } = require("./tools");
const rnd = random(asNum(__filename));
const img = loadImg("shell1.png");
const { width, height } = img;

const adjuster = (x, y, rad) => {
  return index => {
    const adjustment = rnd.val(Math.PI / 180) - Math.PI / 360;
    const newx = Math.round(x + index * Math.sin(rad + adjustment));
    const newy = Math.round(y + index * Math.cos(rad + adjustment));
    return {
      x: (width + newx) % width,
      y: (height + newy) % height
    };
  };
};

const rads = [Math.PI / 3, (Math.PI * 9) / 5, (Math.PI * 5) / 4];

for (let loop = 0; loop < 100000; loop++) {
  const startx = rnd.int(width);
  const starty = rnd.int(height);
  const move = adjuster(startx, starty, rads[loop % rads.length]);
  let last = img.get(startx, starty);

  for (let index = 1; index < width; index++) {
    const { x, y } = move(index);
    const next = img.get(x, y);
    img.set(x, y, last);
    last = next;
  }
  img.set(startx, starty, last);
}

const zoom1 = zoomIn(img, 900, 250, 500, 500);
zoom1.writeOut(__filename, 1);

const zoom2 = zoomIn(img, 525, 0, 500, 500);
zoom2.writeOut(__filename, 2);

const zoom3 = zoomIn(img, 300, 500, 500, 500);
zoom3.writeOut(__filename, 3);
