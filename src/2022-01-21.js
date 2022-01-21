const {
  asNum,
  attributeSorter,
  collectColours,
  emptyData,
  loadImg,
  random,
  setImg
} = require("./tools");

const drawRandomLine = require("./process/draw-random-line-from-point");

const rnd = random(asNum(__filename));
const img = emptyData();
const draw = drawRandomLine({ rnd, img, length: 250 });
const svMapper = ({ s, v }) => 50 - Math.abs(s - 50) + v;

const iterations = [
  {
    source: loadImg("flowers4.png"),
    sorter: (a, b) => svMapper(a) - svMapper(b)
  },
  {
    source: loadImg("trees1.png"),
    sorter: attributeSorter(["h", "v", "s"])
  }
];

iterations.forEach(({ source, sorter }, i) => {
  setImg({ img, source });
  collectColours({ img })
    .sort(sorter)
    .filter((_, j) => j % 10 == 0)
    .forEach(draw);

  img.writeOut(__filename, i + 1);
});
