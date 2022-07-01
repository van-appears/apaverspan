const {
  asNum,
  attributeSorter,
  colours,
  emptyData,
  loadImg,
  partialRotate,
  random
} = require("./tools");
const convert = require("color-convert");

const rnd = random(asNum(__filename));
const getDiffs = () => new Array(4).fill(0).map(_ => rnd.val(30) - 15);
const sorter = attributeSorter(["v", "s", "h"], true);

const sets = [
  {
    source: "location1.png",
    startx: 900,
    starty: 900,
    index: 3
  },
  {
    source: "location1.png",
    startx: 400,
    starty: 900,
    index: 23
  }
];

sets.forEach((set, i) => {
  const img = emptyData();
  const { width, height } = img;
  const source = loadImg(set.source);
  const rots = new Array(31);
  for (let index = 0; index < rots.length; index++) {
    const diffs = getDiffs();
    rots[index] = partialRotate(
      source,
      set.startx + diffs[0],
      set.starty + diffs[1],
      700 + diffs[2],
      700 + diffs[3],
      0.45 - 0.03 * index
    );
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const rotColours = rots
        .map(rot => rot.get(x, y))
        .map(col => {
          const { r, g, b } = col;
          const [h, s, v] = convert.rgb.hsv.raw(r, g, b);
          return { r, g, b, h, s, v };
        })
        .sort(sorter);
      img.set(x, y, rotColours[set.index]);
    }
  }

  img.writeOut(__filename, i + 1);
});
