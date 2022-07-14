const { asNum, colours, emptyData, loadImg, random } = require("./tools");
const { BLACK, WHITE, equals } = colours;

["trees1.png", "shell1.png", "flowers3.png", "flowers4.png"].forEach(
  (file, i) => {
    const img = emptyData(WHITE);
    const { width, height } = img;
    const source = loadImg(file);
    const { int, val } = random(asNum(__filename));

    for (let loop = 0; loop < 1200; loop++) {
      const startX = int(width - 400);
      const startY = 1200 - loop + int(200);
      const changeX = val() - 0.5;
      const changeY = val() - 0.5;
      const lines = Math.min(width - startX, 300 + int(200));

      for (let index = 0; index < lines; index++) {
        let keepGoing = true;
        let x = startX + index;
        let y = startY + index * changeY;
        const colour = index % 14 > 1 ? BLACK : source.get(x, y);

        while (keepGoing) {
          const rX = Math.round(x);
          const rY = Math.round(y);
          const current = img.get(rX, rY);
          keepGoing =
            equals(WHITE, current) &&
            rX > 0 &&
            rX < width &&
            rY > 0 &&
            rY < height;

          if (keepGoing) {
            img.set(rX, rY, colour);
            x += changeX;
            y++;
          }
        }
      }
    }

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (equals(WHITE, img.get(x, y))) {
          img.set(x, y, BLACK);
        }
      }
    }

    img.writeOut(__filename, i + 1);
  }
);
