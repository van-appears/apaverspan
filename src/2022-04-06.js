const { collectColours, emptyData, loadImg } = require("./tools");
const {
  TURN_CLOCKWISE,
  TURN_ANTICLOCKWISE,
  LEFT,
  MIX_COL,
  run
} = require("./process/follow-instructions");

["flowers4.png", "flowers1.png", "flowers2.png"].forEach((x, i) => {
  const img = emptyData();
  const source = loadImg(x);
  const instructionData = collectColours({ img: source });
  run({
    data: instructionData.slice(0, 30000),
    mapCol: col => Math.floor(col.h) % 4,
    instructions: [TURN_CLOCKWISE, TURN_ANTICLOCKWISE, LEFT, MIX_COL],
    initialWidth: 3,
    source,
    img
  });

  img.writeOut(__filename, i + 1);
});
