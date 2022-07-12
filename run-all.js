const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

function processor(stillToProcess) {
  if (stillToProcess.length > 0) {
    const processFile = stillToProcess[0];
    const startTime = new Date().getTime();
    const child = childProcess.fork(processFile);
    child.on("exit", () => {
      const endTime = new Date().getTime();
      const seconds = Math.round((endTime - startTime) / 1000);
      console.log(`Finished ${processFile} in ${seconds}s`);
      processor(stillToProcess.slice(1));
    });
  }
}

const srcDir =
  process.argv.length > 2 ? process.argv[2] : path.join(".", "src");
const dateProcess = new RegExp(`[0-9]{4}-[0-9]{2}-[0-9]{2}.?\\.js`);
const processFiles = fs
  .readdirSync(srcDir)
  .filter(x => dateProcess.test(x))
  .map(x => path.join(srcDir, x));
processor(processFiles);
