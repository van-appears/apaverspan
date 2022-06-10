const {
  collectColours,
  emptyData,
  loadImg,
  partialRotate
} = require("./tools");
const convert = require("color-convert");
const img = emptyData();
const { width, height } = img;

function combineHSV(colour1, colour2) {
  const { h: h1, s: s1, v: v1 } = colour1;
  const { h: h2, s: s2, v: v2 } = colour2;
  const h = (h1 * h2) % 360;
  const s = (s1 * s2) % 100;
  const v = (v1 * v2) % 100;
  const [r, g, b] = convert.hsv.rgb.raw(h, s, v);
  return { r, g, b };
}

const colours = collectColours({
  img: loadImg("location1.png"),
  mode: "column"
});

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    img.set(x, y, combineHSV(colours[x][y], colours[y][x]));
  }
}

[486, 1075, 750, 350, 1270].forEach((x, i) => {
  const section = partialRotate(img, x, x, 200, 200, -Math.PI / 4);
  section.writeOut(__filename, i + 1);
});
