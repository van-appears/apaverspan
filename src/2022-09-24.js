const { constants, emptyData, loadImg, quadrantZoom } = require("./tools");

const img = emptyData();
const { width, height } = img;
const dataR = new Array(width * height).fill("");
const dataG = new Array(width * height).fill("");
const dataB = new Array(width * height).fill("");
const asIndex = (x, y) => y * height + x;

const round = val => (val >> 2) << 2;
constants.ALL_FILES.forEach(f => {
  const source = loadImg(f);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = asIndex(x, y);
      const { r, g, b } = source.get(x, y);
      dataR[index] += `${round(r)}_`;
      dataG[index] += `${round(g)}_`;
      dataB[index] += `${round(b)}_`;
    }
  }
});

const simplifyStr = str => {
  const group = str
    .split("_")
    .filter(x => x)
    .reduce((acc, x) => {
      acc[x] = (acc[x] || 0) + 1;
      return acc;
    }, {});
  const most = Object.values(group)
    .filter(v => v > 1)
    .sort((a, b) => b - a);
  return most.length > 0
    ? Object.keys(group).find(k => group[k] === most[0])
    : 0;
};

const simplify = index => ({
  r: simplifyStr(dataR[index]),
  g: simplifyStr(dataG[index]),
  b: simplifyStr(dataB[index])
});

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    img.set(x, y, simplify(asIndex(x, y)));
  }
}

img.writeOut(__filename, 1);
quadrantZoom(img).forEach((q, i) => q.writeOut(__filename, i + 2));
