const { collectColours, emptyData, loadImg } = require("./tools");

const allColours = collectColours({
  img: loadImg("flowers4.png"),
  mode: "column"
});

const addAttribute = (prev, add, ratio) =>
  Math.min(Math.round(prev + ratio * add), 255);

const addColour = (prev, add, ratio) => ({
  r: addAttribute(prev.r, add.r, ratio),
  g: addAttribute(prev.g, add.g, ratio),
  b: addAttribute(prev.b, add.b, ratio)
});

const mappings = [
  { attr: "v", limit: 20 },
  { attr: "s", limit: 25 },
  { attr: "h", limit: 40 }
];

mappings.forEach(({ attr, limit }, i) => {
  const img = emptyData();
  const { width, height } = img;

  const addImgColour = (x, y, add, ratio) => {
    const prev = img.get(x, y);
    if (prev) {
      img.set(x, y, addColour(prev, add, ratio));
    }
  };

  const addRow = (x, y, add) => {
    addImgColour(x - 3, y, add, 0.06);
    addImgColour(x - 2, y, add, 0.12);
    addImgColour(x - 1, y, add, 0.18);
    addImgColour(x, y, add, 0.24);
    addImgColour(x + 1, y, add, 0.18);
    addImgColour(x + 2, y, add, 0.12);
    addImgColour(x + 3, y, add, 0.06);
  };

  for (let x = 0; x < width; x++) {
    let last = allColours[x][0];
    let useCol = last;
    addRow(x, 0, useCol);

    for (let y = 1; y < height; y++) {
      const next = allColours[x][y];
      if (Math.abs(next[attr] - last[attr]) > limit) {
        useCol = next;
      }
      addRow(x, y, useCol);
      last = next;
    }
  }

  img.writeOut(__filename, i + 1);
});
