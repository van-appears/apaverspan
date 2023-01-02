const Alea = require("alea");
const asNum = require("./as-num");

module.exports = function (seed) {
  const prng = new Alea(typeof seed === "number" ? seed : asNum(seed));

  const item = function (arr) {
    const index = Math.floor(prng() * arr.length);
    return arr[index];
  };

  return {
    item,
    rndItem: item,
    int(from) {
      return Math.floor(prng() * (Array.isArray(from) ? from.length : from));
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
    },
    rndBoolean() {
      return prng() < 0.5;
    },
    rndCol() {
      return {
        r: Math.floor(prng() * 256),
        g: Math.floor(prng() * 256),
        b: Math.floor(prng() * 256)
      };
    }
  };
};
