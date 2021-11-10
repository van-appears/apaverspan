module.exports = {
  RED: { r: 255, g: 0, b: 0 },
  YELLOW: { r: 255, g: 255, b: 0 },
  GREEN: { r: 0, g: 255, b: 0 },
  CYAN: { r: 0, g: 255, b: 255 },
  BLUE: { r: 0, g: 0, b: 255 },
  MAGENTA: { r: 255, g: 0, b: 255 },
  WHITE: { r: 255, g: 255, b: 255 },
  BLACK: { r: 0, g: 0, b: 0 },

  mix: function () {
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
};
