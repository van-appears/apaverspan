const { attributeSorter, collectColours, emptyData, loadImg, zoomIn } = require("./tools");
const img = emptyData();

const source = loadImg("trees1.png");
const { height, width } = img;
const allColours = collectColours({ img: source })
  .sort(attributeSorter(['s', 'v', 'h']));

allColours
  .map(({x, y}, i) => {
    const moved = allColours[(i + 600000) % allColours.length];
    return { ...moved, x, y };
  })
  .forEach(({x, y, ...col}) => {
    img.set(x, y, col);
  });

zoomIn(img, 300, 0, width - 300, height - 300)
  .writeOut(__filename);
