const { emptyData, codeLetters, fillCircle } = require("./tools");

const img = emptyData();
const { width, height } = img;
const filler = fillCircle(img);
const rgb = [0, 0, 0];
const charCodes = codeLetters(__filename);
let codesIndex = 0;

const wrap = x => (x < 256 ? x : 510 - x);

for (let radius = 1000; radius > 0; radius--) {
  filler(width / 2, height / 2, radius, {
    r: wrap(rgb[0]),
    g: wrap(rgb[1]),
    b: wrap(rgb[2])
  });

  const i = charCodes[codesIndex] % 3;
  rgb[i] = (rgb[i] + 1) % 510;
  codesIndex = (codesIndex + 1) % charCodes.length;
}

img.writeOut(__filename);
