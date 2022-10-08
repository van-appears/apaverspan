const { constants, emptyData, loadImg } = require("./tools");

const img = emptyData();
const { width, height } = img;
const data = new Array(width * height).fill("");
const round = val => (val >> 3) << 3;

constants.ALL_FILES.forEach(f => {
  const source = loadImg(f);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = y * height + x;
      const { r, g, b } = source.get(x, y);
      data[index] += `${round(r)}_${round(g)}_${round(b)},`;
    }
  }
});

let last = { r: 0, g: 0, b: 0 };
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const index = y * height + x;
    const cols = data[index]
      .split(",")
      .filter(x => x)
      .map(x => {
        const attrs = x.split("_").map(x => parseInt(x));
        return { r: attrs[0], g: attrs[1], b: attrs[2] };
      });

    const next = cols.find(
      col => col.r === last.r || col.g === last.g || col.b === last.b
    );
    if (next) {
      last = next;
    }

    img.set(x, y, last);
  }
}

img.writeOut(__filename);
