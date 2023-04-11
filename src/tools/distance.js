module.exports = function (...args) {
  if (args.length === 2) {
    const [p1, p2] = args;
    return Math.pow(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2), 0.5);
  } else {
    const [x1, y1, x2, y2] = args;
    return Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5);
  }
};
