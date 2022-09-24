const { constants, emptyData, loadImg, quadrantZoom } = require("./tools");

const img = emptyData();
const { width, height } = img;
const round = val => (val >> 2) << 2;

const dataR = new Array(width * height);
const dataG = new Array(width * height);
const dataB = new Array(width * height);
for (let index = 0; index < dataR.length; index++) {
  dataR[index] = "";
  dataG[index] = "";
  dataB[index] = "";
}

constants.ALL_FILES.forEach(f => {
  const source = loadImg(f);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = y * height + x;
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

const simplify = (r, g, b) => {
  return {
    r: simplifyStr(r),
    g: simplifyStr(g),
    b: simplifyStr(b)
  };
};

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const index = y * height + x;
    const col = simplify(dataR[index], dataG[index], dataB[index]);
    img.set(x, y, col);
  }
}

img.writeOut(__filename, 1);
quadrantZoom(img).forEach((q, i) => q.writeOut(__filename, i + 2));
