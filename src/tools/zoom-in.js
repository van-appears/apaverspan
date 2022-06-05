const constants = require("./constants");
const emptyData = require("./empty-data");

const beforeAfter = val => {
  const before = Math.floor(val);
  const after = Math.ceil(val);
  return [
    before,
    after,
    after === before ? 1 : after - val,
    after === before ? 0 : val - before
  ];
};

const roughInterpolater = (source, useX, useY) => {
  const [beforeX, afterX, ratioX, invRatioX] = beforeAfter(useX);
  const [beforeY, afterY, ratioY, invRatioY] = beforeAfter(useY);
  const col1 = source.get(beforeX, beforeY);
  const col2 = source.get(beforeX, afterY) || col1;
  const col3 = source.get(afterX, beforeY) || col1;
  const col4 = source.get(afterX, afterY) || col1;

  const quadMix = attr =>
    col1[attr] * ratioX * ratioY +
    col2[attr] * ratioX * invRatioY +
    col3[attr] * invRatioX * ratioY +
    col4[attr] * invRatioX * invRatioY;

  return {
    r: quadMix("r"),
    g: quadMix("g"),
    b: quadMix("b")
  };
};

const noInterpolator = (source, useX, useY) =>
  source.get(Math.floor(useX), Math.floor(useY));

module.exports = function (
  source,
  startX,
  startY,
  zoomWidth,
  zoomHeight,
  interpolate = false
) {
  const img = emptyData();
  const { width, height } = img;
  const moveX = zoomWidth / width;
  const moveY = zoomHeight / height;
  const interpolater = interpolate ? roughInterpolater : noInterpolator;

  let currentY = startY;
  for (let y = 0; y < height; y++) {
    let currentX = startX;
    for (let x = 0; x < width; x++) {
      img.set(x, y, interpolater(source, currentX, currentY));
      currentX += moveX;
    }
    currentY += moveY;
  }

  return img;
};
