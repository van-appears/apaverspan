const { loadImg, random } = require("../tools");
const { int, item } = random(__filename);
const asKey = ({ x, y }) => `${x}_${y}`;

["flowers4.png", "trees1.png", "flowers1.png"].forEach((file, i) => {
  const img = loadImg(file);
  const { width, height } = img;

  for (let loop = 0; loop < 100000; loop++) {
    let x = int(width);
    let y = int(height);
    let attr = {};
    switch (int(3)) {
      case 0:
        attr.r = img.get(x, y).r;
        break;
      case 1:
        attr.g = img.get(x, y).g;
        break;
      case 2:
        attr.b = img.get(x, y).b;
        break;
    }

    const visited = {};
    let keepGoing = true;
    while (keepGoing) {
      const possible = [
        { x: x - 1, y: y - 1 },
        { x: x - 1, y },
        { x: x - 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x + 1, y: y + 1 },
        { x: x + 1, y },
        { x: x + 1, y: y - 1 },
        { x, y: y - 1 }
      ].filter(pos => !visited[asKey(pos)]);

      keepGoing = false;
      if (possible.length) {
        const next = item(possible);
        if (next.x >= 0 && next.x < width && next.y >= 0 && next.y < height) {
          const col = img.get(next.x, next.y);
          img.set(next.x, next.y, { ...col, ...attr });
          keepGoing = visited[asKey(next)] = true;
          x = next.x;
          y = next.y;
        }
      }
    }
  }

  img.writeOut(__filename, i + 1);
});
