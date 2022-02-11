const scaler = (from, to, length) => index =>
  Math.round(from + ((to - from) * index) / length);

const gradient = (from, to, length) => {
  const r = scaler(from.r, to.r, length);
  const g = scaler(from.g, to.g, length);
  const b = scaler(from.b, to.b, length);
  return index => ({
    r: r(index),
    g: g(index),
    b: b(index)
  });
};

module.exports = function (img) {
  const drawLine = (fromX, fromY, toX, toY, colour1, colour2) => {
    const lengthX = Math.abs(fromX - toX);
    const lengthY = Math.abs(fromY - toY);
    const useLength = Math.max(lengthX, lengthY);
    const x = scaler(fromX, toX, useLength);
    const y = scaler(fromY, toY, useLength);
    const c = colour2 ? gradient(colour1, colour2, useLength) : () => colour1;

    for (let index = 0; index <= useLength; index++) {
      img.set(x(index), y(index), c(index));
    }
  };
  if (arguments.length === 1) {
    return drawLine;
  }
  drawLine(
    arguments[1],
    arguments[2],
    arguments[3],
    arguments[4],
    arguments[5],
    arguments[6]
  );
};
