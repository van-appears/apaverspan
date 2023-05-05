const outPath = require("./out-path");
const loadImg = require("./load-img");
const { IMAGE_SIZE } = require("./constants");
const fs = require("fs");
const { createCanvas } = require("canvas");
const GIFEncoder = require("gifencoder");

module.exports = function (opts) {
  const { folder, images, repeat, delay, quality } = opts;
  const canvas = createCanvas(IMAGE_SIZE, IMAGE_SIZE);
  const context = canvas.getContext("2d");
  const encoder = new GIFEncoder(IMAGE_SIZE, IMAGE_SIZE);

  return {
    writeOut: function (srcFilename, suffix) {
      const ending = suffix ? `_${suffix}.gif` : ".gif";
      const imageFile = outPath(srcFilename, ending);
      encoder.createReadStream().pipe(fs.createWriteStream(imageFile));
      encoder.start();
      encoder.setRepeat(repeat || 0);
      encoder.setDelay(delay || 1000);
      encoder.setQuality(quality || 10);

      const imgList = images || fs.readdirSync(folder);
      for (let index = 0; index < imgList.length; index++) {
        const img =
          typeof imgList[index] === "string"
            ? loadImg(imgList[index])
            : imgList[index];

        for (let x = 0; x < IMAGE_SIZE; x++) {
          for (let y = 0; y < IMAGE_SIZE; y++) {
            const { r, g, b } = img.get(x, y);
            context.fillStyle = `rgba(${r},${g},${b},1)`;
            context.fillRect(x, y, 1, 1);
          }
        }
        encoder.addFrame(context);
      }

      encoder.finish();
    }
  };
};
