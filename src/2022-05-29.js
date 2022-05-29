const combineImagesPixels = require("./process/combine-images-pixels");
const convert = require("color-convert");

function combiner(pixels) {
  const [pixel1, pixel2] = pixels;
  const { h: h1, s: s1, v: v1 } = pixel1;
  const { h: h2, s: s2, v: v2 } = pixel2;
  const h = (h1 + h2) % 360;
  const s = (s1 + s2) % 100;
  const v = (v1 + v2) % 100;
  const [r, g, b] = convert.hsv.rgb.raw(h, s, v);
  return { r, g, b };
}

[
  ["flowers2.png", "flowers3.png"],
  ["flowers1.png", "location1.png"]
].forEach((pair, i) =>
  combineImagesPixels({
    files: pair,
    combiner
  }).writeOut(__filename, i + 1)
);
