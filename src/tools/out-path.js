const fs = require("fs");
const path = require("path");
const fileNameRegex = new RegExp(`(.*)${path.sep}src.*${path.sep}(.+)\\.js`);

function ensureOutputDirectory(outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
}

module.exports = function (srcFilename, extension) {
  const [, fileDir, nameWithoutExt] = fileNameRegex.exec(srcFilename);
  const outputDir = path.join(fileDir, "out");
  ensureOutputDirectory(outputDir);
  return path.join(outputDir, `${nameWithoutExt}${extension}`);
};
