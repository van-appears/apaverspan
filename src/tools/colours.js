function equals(col1, col2) {
  if (!col1 || !col2) {
    return false;
  }
  return col1.r === col2.r && col1.g === col2.g && col1.b === col2.b;
}

function mix() {
  const mixer = (ratio1, ratio2) => {
    const divisor = ratio1 + ratio2;
    const mixVal = (val1, val2) => (val1 * ratio1 + val2 * ratio2) / divisor;
    return (colour1, colour2) => {
      const r = mixVal(colour1.r, colour2.r);
      const g = mixVal(colour1.g, colour2.g);
      const b = mixVal(colour1.b, colour2.b);
      return { r, g, b };
    };
  };
  if (arguments.length === 2) {
    return mixer(arguments[0], arguments[1]);
  }
  return mixer(arguments[2], arguments[3])(arguments[0], arguments[1]);
}

function replaceAll(img, col, replaceCol) {
  const { width, height } = img;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (equals(col, img.get(x, y))) {
        img.set(x, y, replaceCol);
      }
    }
  }
}

function avg(...cols) {
  const sum = cols.reduce(
    (acc, { r, g, b }) => {
      acc.r += r;
      acc.g += g;
      acc.b += b;
      return acc;
    },
    { r: 0, g: 0, b: 0 }
  );
  const avgv = val => Math.round(val / cols.length);
  return { r: avgv(sum.r), g: avgv(sum.g), b: avgv(sum.b) };
}

const colours = {
  RED: { r: 255, g: 0, b: 0 },
  YELLOW: { r: 255, g: 255, b: 0 },
  GREEN: { r: 0, g: 255, b: 0 },
  CYAN: { r: 0, g: 255, b: 255 },
  BLUE: { r: 0, g: 0, b: 255 },
  MAGENTA: { r: 255, g: 0, b: 255 },
  WHITE: { r: 255, g: 255, b: 255 },
  BLACK: { r: 0, g: 0, b: 0 }
};

Object.keys(colours).forEach(key => {
  colours[key].equals = function (col2) {
    return equals(colours[key], col2);
  };
});

module.exports = {
  ...colours,
  equals,
  mix,
  avg,
  replaceAll
};
