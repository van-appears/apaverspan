const { collectColours, emptyData, loadImg } = require("./tools");
const { run } = require("./process/follow-instructions");

["flowers1.png", "flowers2.png", "flowers4.png"].forEach((x, i) => {
  const img = emptyData();
  const source = loadImg(x);
  const instructionData = collectColours({ img: source });
  run({
    data: instructionData.slice(0, 300000),
    source,
    img
  });

  img.writeOut(__filename, i + 1);
});
