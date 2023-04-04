const { colours, loadImg, quadrantZoom } = require("./tools");
const rescale = require("./process/rescale");

[
  "location1.png",
  "flowers1.png",
  "flowers4.png",
  "shell1.png",
  "trees1.png"
].forEach((file, i) => {
  const src = loadImg(file);
  const { width, height } = src;

  for (let loop = 0; loop < 7; loop++) {
    const sections = quadrantZoom(src, true);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const avg = colours.avg(...sections.map(s => s.get(x, y)));
        src.set(x, y, avg);
      }
    }
  }

  const img = rescale(src);
  img.writeOut(__filename, i + 1);
});
