const drawLine = require("./draw-line");

module.exports = function (img) {
  const line = drawLine(img);
  const { height, width } = img;
  const min = (o1, o2, param) => [o1, o2].sort((a, b) => a[param] - b[param]);

  const fillXY = (pos1, pos2, fromX, colourOrFun) => {
    const pos = min(pos1, pos2, "y");
    const xDiff = pos[1].x - pos[0].x;
    const yDiff = pos[1].y - pos[0].y;
    for (let index = 0; index <= yDiff; index++) {
      const x = pos[0].x + (index * xDiff) / yDiff;
      line(fromX, pos[0].y + index, x, pos[0].y + index, colourOrFun);
    }
  };

  const fillYX = (pos1, pos2, fromY, colourOrFun) => {
    const pos = min(pos1, pos2, "x");
    const xDiff = pos[1].x - pos[0].x;
    const yDiff = pos[1].y - pos[0].y;
    for (let index = 0; index <= xDiff; index++) {
      const y = pos[0].y + (index * yDiff) / xDiff;
      line(pos[0].x + index, fromY, pos[0].x + index, y, colourOrFun);
    }
  };

  const fillLeft = (x1, y1, x2, y2, colourOrFun) => {
    fillXY({ x: x1, y: y1 }, { x: x2, y: y2 }, 0, colourOrFun);
  };

  const fillRight = (x1, y1, x2, y2, colourOrFun) => {
    fillXY({ x: x1, y: y1 }, { x: x2, y: y2 }, width - 1, colourOrFun);
  };

  const fillTop = (x1, y1, x2, y2, colourOrFun) => {
    fillYX({ x: x1, y: y1 }, { x: x2, y: y2 }, 0, colourOrFun);
  };

  const fillBottom = (x1, y1, x2, y2, colourOrFun) => {
    fillYX({ x: x1, y: y1 }, { x: x2, y: y2 }, height - 1, colourOrFun);
  };

  return {
    fillLeft,
    fillRight,
    fillTop,
    fillBottom
  };
};
