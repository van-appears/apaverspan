const { asNum, loadImg, random } = require("./tools");
const rnd = random(asNum(__filename));
const img = loadImg("shell1.png");
const { width, height } = img;

const adjuster = limit => {
  let pos = 1 + rnd.int(limit - 2);
  return () => {
    pos += rnd.int(3) - 1;
    if (pos <= 1) {
      pos = 1;
    } else if (pos >= limit - 2) {
      pos = limit - 2;
    }
    return pos;
  };
};

for (let loop = 0; loop < 500; loop++) {
  let getNextLimit = adjuster(height);
  for (let x = 0; x < width; x++) {
    const nextLimit = getNextLimit();
    const keep = img.get(x, height - 1);
    for (let y = height - 1; y > nextLimit; y--) {
      img.set(x, y, img.get(x, y - 1));
    }
    img.set(x, nextLimit, keep);
  }

  getNextLimit = adjuster(height);
  for (let x = 0; x < width; x++) {
    const nextLimit = getNextLimit();
    const keep = img.get(x, 0);
    for (let y = 0; y <= nextLimit; y++) {
      img.set(x, y, img.get(x, y + 1));
    }
    img.set(x, nextLimit, keep);
  }

  getNextLimit = adjuster(width);
  for (let y = 0; y < height; y++) {
    const nextLimit = getNextLimit();
    const keep = img.get(width - 1, y);
    for (let x = width - 1; x > nextLimit; x--) {
      img.set(x, y, img.get(x - 1, y));
    }
    img.set(nextLimit, y, keep);
  }

  getNextLimit = adjuster(width);
  for (let y = 0; y < height; y++) {
    const nextLimit = getNextLimit();
    const keep = img.get(0, y);
    for (let x = 0; x <= nextLimit; x++) {
      img.set(x, y, img.get(x + 1, y));
    }
    img.set(nextLimit, y, keep);
  }
}

img.writeOut(__filename);
