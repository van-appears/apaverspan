const path = require("path");
const fileNameRegex = new RegExp(
  `.*${path.sep}(\\d{4})-(\\d{2})-(\\d{2}).*.js`
);

function parse(fullPath) {
  const parsed = fileNameRegex.exec(fullPath);
  if (!parsed) {
    throw new Error(`Couldn't get numbers from ${fullPath}`);
  }
  return { y: parsed[1], m: parsed[2], d: parsed[3] };
}

function asNum(fullPath) {
  const { y, m, d } = parse(fullPath);
  const yearMultipler = process.env.OLD_RANDOM === "Y" ? 1000000 : 10000;
  let total = parseInt(d);
  total += parseInt(m) * 100;
  total += parseInt(y) * yearMultipler;
}

asNum.year = function (fullPath) {
  const { y } = parse(fullPath);
  return y;
};

asNum.month = function (fullPath) {
  const { m } = parse(fullPath);
  return m;
};

asNum.day = function (fullPath) {
  const { d } = parse(fullPath);
  return d;
};

module.exports = asNum;
