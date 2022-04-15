const { collectColours, colours, emptyData, loadImg } = require("./tools");
const {
  TURN_CLOCKWISE,
  MOVE,
  DOUBLE_MOVE,
  MIX_COL,
  run
} = require("./process/follow-instructions");

["flowers1.png", "flowers2.png", "flowers4.png"].forEach((x, i) => {
  const img = emptyData();
  const source = loadImg(x);
  const instructionData = collectColours({ img: source });
  run({
    data: instructionData.slice(0, 100000),
    mapCol: col => Math.floor(col.h) % 4,
    instructions: [TURN_CLOCKWISE, MOVE, DOUBLE_MOVE, MIX_COL],
    initialWidth: 2,
    source,
    img
  });

  img.writeOut(__filename, i+1);
});
