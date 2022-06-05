const zoomIn = require("./zoom-in");
const constants = require("./constants");
const half = constants.IMAGE_SIZE / 2;

module.exports = function(source, interpolate) {
  return [
    zoomIn(source, 0, 0, half, half, interpolate),
    zoomIn(source, half, 0, half, half, interpolate),
    zoomIn(source, 0, half, half, half, interpolate),
    zoomIn(source, half, half, half, half, interpolate)
  ];
}
