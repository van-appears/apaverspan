module.exports = function (attributes, reversed) {
  return (a, b) => {
    const first = reversed ? b : a;
    const second = reversed ? a : b;

    let diff = 0;
    for (let index = 0; index < attributes.length; index++) {
      diff = first[attributes[index]] - second[attributes[index]];
      if (diff) {
        break;
      }
    }
    return diff;
  };
};
