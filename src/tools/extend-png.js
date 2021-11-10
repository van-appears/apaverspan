const fs = require("fs");
const PNG = require("pngjs").PNG;
const outPath = require("./out-path");

module.exports = function (png) {
  png.pos = function (x, y) {
    return (Math.floor(y) * this.width + Math.floor(x)) << 2;
  };

  png.get = function (x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return;
    }
    const idx = this.pos(x, y);
    return {
      r: this.data[idx],
      g: this.data[idx + 1],
      b: this.data[idx + 2]
    };
  };

  png.set = function (x, y, col) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return;
    }
    const idx = this.pos(x, y);
    this.data[idx] = Math.floor(col.r);
    this.data[idx + 1] = Math.floor(col.g);
    this.data[idx + 2] = Math.floor(col.b);
    this.data[idx + 3] = 0xff;
  };

  png.writeOut = function (srcFilename, suffix) {
    const ending = suffix ? `_${suffix}.png` : ".png";
    const imageFile = outPath(srcFilename, ending);
    const buffer = PNG.sync.write(this);
    fs.writeFileSync(imageFile, buffer);
  };
};
