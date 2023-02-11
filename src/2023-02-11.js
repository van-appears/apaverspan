const { emptyData, codeLetters } = require("./tools");

const img = emptyData();
const { width, height } = img;
const data = new Array(width * height).fill(0);
const codes = Array.from(
  codeLetters(__filename).reduce((acc, code) => {
    acc.add(code);
    return acc;
  }, new Set())
);

const roll = (from, to) => index => from + (index / data.length) * (to - from);

let max = 0,
  min = 0;
for (let c = 0; c < codes.length / 3; c++) {
  const roller = roll(codes[c], codes[c + 1]);
  for (let i = 0; i < data.length; i++) {
    const d = (data[i] += Math.sin((Math.PI * 2 * i) / roller(i)));
    max = Math.max(d, max);
    min = Math.min(d, min);
  }
}

data.forEach((d, i) => {
  let c = (255 * (d - min)) / (max - min);
  const x = i % width;
  const y = i / width;
  img.set(x, y, { r: c, g: c, b: c });
});

img.writeOut(__filename);
