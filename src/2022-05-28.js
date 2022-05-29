const combineImagesPixels = require("./process/combine-images-pixels");

function combiner(pixels) {
  const [pixel1, pixel2] = pixels;
  const { r: r1, g: g1, b: b1 } = pixel1;
  const { r: r2, s: g2, b: b2 } = pixel2;
  const r = (r1 + r2) % 256;
  const g = (g1 + g2) % 256;
  const b = (b1 + b2) % 256;
  return { r, g, b };
}

[
  ["flowers2.png", "flowers4.png"],
  ["flowers1.png", "flowers3.png"]
].forEach((pair, i) =>
  combineImagesPixels({
    files: pair,
    combiner
  }).writeOut(__filename, i + 1)
);
