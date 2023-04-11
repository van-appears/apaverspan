const { IMAGE_SIZE } = require("../tools/constants");
const emptyData = require("../tools/empty-data");
const asIndex = (x, y) => x + IMAGE_SIZE * y;
const fromIndex = index => ({
  x: index % IMAGE_SIZE,
  y: Math.floor(index / IMAGE_SIZE)
});

module.exports = function () {
  const pixels = new Array(IMAGE_SIZE * IMAGE_SIZE).fill(0).map(() => ({
    r: 0,
    g: 0,
    b: 0,
    c: 0
  }));

  return {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,

    set(x, y, col) {
      try {
        const pixel = pixels[asIndex(x, y)];
        pixel.r += col.r;
        pixel.g += col.g;
        pixel.b += col.b;
        pixel.c += 1;
      } catch (e) { /* silent failure */ }
    },

    get(x, y) {
      try {
        return pixels[asIndex(x, y)];
      } catch (e) {
        return null;
      }
    },

    asImg() {
      const img = emptyData();
      pixels.forEach((p, index) => {
        const { x, y } = fromIndex(index);
        img.set(x, y, {
          r: Math.round(p.r / p.c),
          g: Math.round(p.g / p.c),
          b: Math.round(p.b / p.c)
        });
      });
      return img;
    }
  };
};
