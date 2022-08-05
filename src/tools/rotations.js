const emptyData = require("./empty-data");
const setImg = require("./set-img");

const remap = source => {
  const { width, height } = source;
  return {
    clockwise90(x, y) {
      return { x: y, y: width - 1 - x };
    },
    clockwise90FlipHorizontal(x, y) {
      return { x: y, y: x };
    },
    clockwise180(x, y) {
      return { x: width - 1 - x, y: height - 1 - y };
    },
    clockwise180FlipHorizontal(x, y) {
      return { x, y: height - 1 - y };
    },
    clockwise270(x, y) {
      return { x: height - 1 - y, y: x };
    },
    clockwise270FlipHorizontal(x, y) {
      return { x: height - 1 - y, y: width - 1 - x };
    },
    flipHorizontal(x, y) {
      return { x: width - 1 - x, y };
    },
    flipVertical(x, y) {
      return { x, y: height - 1 - y };
    }
  };
};

const clockwise90 = source => {
  const mapper = remap(source);
  const img = emptyData();
  setImg({ img, source, remap: mapper.clockwise90 });
  return img;
};
const clockwise90FlipHorizontal = source => {
  const mapper = remap(source);
  const img = emptyData();
  setImg({ img, source, remap: mapper.clockwise90FlipHorizontal });
  return img;
};
const clockwise180 = source => {
  const mapper = remap(source);
  const img = emptyData();
  setImg({ img, source, remap: mapper.clockwise180 });
  return img;
};
const clockwise180FlipHorizontal = source => {
  const mapper = remap(source);
  const img = emptyData();
  setImg({ img, source, remap: mapper.clockwise180FlipHorizontal });
  return img;
};
const clockwise270 = source => {
  const mapper = remap(source);
  const img = emptyData();
  setImg({ img, source, remap: mapper.clockwise270 });
  return img;
};
const clockwise270FlipHorizontal = source => {
  const mapper = remap(source);
  const img = emptyData();
  setImg({ img, source, remap: mapper.clockwise270FlipHorizontal });
  return img;
};
const flipHorizontal = source => {
  const mapper = remap(source);
  const img = emptyData();
  setImg({ img, source, remap: mapper.flipHorizontal });
  return img;
};

module.exports = {
  remap,
  clockwise90,
  clockwise90FlipHorizontal,
  clockwise180,
  clockwise180FlipHorizontal,
  clockwise270,
  clockwise270FlipHorizontal,
  flipHorizontal,
  flipVertical: clockwise180FlipHorizontal
};
