const { colours } = require("../tools");
const { equals, BLACK } = colours;

module.exports = function (img, emptyCol = BLACK) {
  return function (startLocation, endLocation) {
    const { x: startX, y: startY } = startLocation;
    const { x: endX, y: endY } = endLocation;

    const distX = endX - startX;
    const distY = endY - startY;
    const maxDist = Math.max(Math.abs(distX), Math.abs(distY));

    for (let move = 0; move <= maxDist; move++) {
      const testX = Math.round(endX - (distX * move) / maxDist);
      const testY = Math.round(endY - (distY * move) / maxDist);
      const testCol = img.get(testX, testY);
      if (equals(testCol, emptyCol)) {
        return { x: testX, y: testY };
      }
    }
    return null;
  };
};
