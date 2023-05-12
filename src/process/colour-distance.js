module.exports = function (baseCol) {
  return function (col) {
    const squ = attr => Math.pow(baseCol[attr] - col[attr], 2);
    return squ("r") + squ("g") + squ("b");
  };
};
