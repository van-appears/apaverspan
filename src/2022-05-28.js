const { collectColours, emptyData, loadImg } = require("./tools");
const convert = require("color-convert");
const img = emptyData();
const { width, height } = img;

const pairs = [
  ["flowers2.png", "flowers4.png"],
  ["flowers1.png", "flowers3.png"]
];

function combineRGB(colour1, colour2) {
  const { r: r1, g: g1, b: b1 } = colour1;
  const { r: r2, s: g2, b: b2 } = colour2;
  const r = (r1 + r2) % 256;
  const g = (g1 + g2) % 256;
  const b = (b1 + b2) % 256;
  return { r, g, b };
}

pairs.forEach((pair, i) => {
  const colours0 = collectColours({
    img: loadImg(pair[0]),
    mode: "column"
  });
  const colours1 = collectColours({
    img: loadImg(pair[1]),
    mode: "column"
  });

  for (let x=0; x<width; x++) {
    for (let y=0; y<height; y++) {
      img.set(x, y, combineRGB(colours0[x][y], colours1[x][y]));
    }
  }
  img.writeOut(__filename, i + 1);
});
