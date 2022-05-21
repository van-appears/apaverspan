const { collectColours, emptyData, loadImg } = require("./tools");
const convert = require("color-convert");
const img = emptyData();
const { width, height } = img;

const pairs = [
  ["flowers1.png", "flowers2.png"],
  ["flowers3.png", "flowers4.png"]
];

function combineHSV(colour1, colour2) {
  const { h: h1, s: s1, v: v1 } = colour1;
  const { h: h2, s: s2, v: v2 } = colour2;
  const h = (h1 * h2) / 360;
  const s = (s1 * s2) / 100;
  const v = (v1 * v2) / 100;
  const [r, g, b] = convert.hsv.rgb.raw(h, s, v);
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

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      img.set(x, y, combineHSV(colours0[x][y], colours1[x][y]));
    }
  }
  img.writeOut(__filename, i + 1);
});
