const fs = require("fs");
const path = require("path");
const PNG = require("pngjs").PNG;
const extendPng = require("./extend-png");
const { INPUT_DIR } = require("./constants");

module.exports = function (name) {
  const inputFile = name.includes(path.sep) ? name : path.join(INPUT_DIR, name);
  const data = fs.readFileSync(inputFile);
  const img = PNG.sync.read(data);
  extendPng(img);
  return img;
};
