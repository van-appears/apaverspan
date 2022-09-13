const Alea = require("alea");

module.exports = function (seed) {
  const prng = new Alea(seed);
  return {
    int(from) {
      return Math.floor(prng() * (Array.isArray(from) ? from.length : from));
    },
    item(arr) {
      const index = Math.floor(prng() * arr.length);
      return arr[index];
    },
    val(scale = 1) {
      return scale * prng();
    },
    shuffle(list) {
      list.forEach((x, i) => {
        const pos = Math.floor(prng() * list.length);
        const val = list[pos];
        list[pos] = x;
        list[i] = val;
      });
    }
  };
};
