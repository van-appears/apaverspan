const { constants, emptyData, loadImg } = require("./tools");

const TWOPI = 2 * Math.PI;
const add = (rad, val) => (rad + val / 999) % TWOPI;
const col = rad => 128 + 127 * Math.sin(rad);
const files = ["location1.png", "flowers3.png", "trees1.png", "flowers2.png"];

files.forEach((file, i) => {
  const src = loadImg(file);
  const img = emptyData();
  const { width, height } = img;

  for (let y = 0; y < height; y++) {
    let radR, radG, radB;
    radR = radG = radB = (TWOPI * y) / height;

    for (let x = 0; x < width; x++) {
      const { r, g, b } = src.get(x, y);
      radR = add(radR, r);
      radG = add(radG, g);
      radB = add(radB, b);

      img.set(x, y, {
        r: col(radR),
        g: col(radG),
        b: col(radB)
      });
    }
  }

  img.writeOut(__filename, i + 1);
});
