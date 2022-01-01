const fs = require("fs");

module.exports = function (inputFile) {
  return fs
    .readFileSync(inputFile, "utf8")
    .toString()
    .split("")
    .map(x => x.charCodeAt(0));
};
