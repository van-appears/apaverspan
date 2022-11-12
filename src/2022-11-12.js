const { emptyData, loadImg, zoomIn } = require("./tools");
const convert = require("color-convert");

const areas = [
  { file: "flowers3.png", x: 900, y: 350 },
  { file: "flowers2.png", x: 400, y: 650 }
];

areas.forEach((area, i) => {
  const img = emptyData();
  const source = loadImg(area.file);
  const { width, height } = img;

  for (let y = 0; y < height; y++) {
    const matchS = 100 - Math.floor((100 * y) / height);
    const matchV = 100 - Math.floor((100 * y) / height);

    for (let x = 0; x < width; x++) {
      const col = source.get(x, y);
      const { r, g, b } = col;
      const [, s, v] = convert.rgb.hsv.raw(r, g, b);

      if (s >> 2 === matchS >> 2 || v >> 2 === matchV >> 2) {
        img.set(x, y, col);
      }
    }
  }

  zoomIn(img, area.x, area.y, 500, 500).writeOut(__filename, i + 1);
});
