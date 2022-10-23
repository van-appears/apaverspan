const { loadImg, zoomIn } = require("./tools");
const scale = x => (x % 4) * 85;

const img = loadImg("location1.png");
const { width, height } = img;
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const { r, g, b } = img.get(x, y);
    img.set(x, y, {
      r: scale(r),
      g: scale(g),
      b: scale(b)
    });
  }
}

zoomIn(img, 879, 0, 174, 174).writeOut(__filename);
