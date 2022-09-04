const { collectColours } = require("../tools");

module.exports = function ({ img, file, attributes }) {
  const makeKey = col =>
    attributes.reduce((acc, attr) => {
      return acc + col[attr] + "_";
    }, "");

  return collectColours({ img, file }).reduce((acc, col) => {
    const key = makeKey(col);
    const collected = (acc[key] = acc[key] || []);
    collected.push(col);
    return acc;
  }, {});
};
