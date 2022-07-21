const { asNum, colours, loadImg, random } = require("./tools");
const { mix } = colours;

["location1.png", "flowers2.png"].forEach((file, i) => {
  const img = loadImg(file);
  const { width, height } = img;
  const { int } = random(asNum(__filename));

  for (let index = 0; index < 10000; index++) {
    let x = int(width);
    let y = int(height);
    let mixColour = img.get(x, y);

    for (let step = 0; step < 10000; step++) {
      switch (int(4)) {
        case 0:
          x = (x + 1) % width;
          break;
        case 1:
          x = (x + width - 1) % width;
          break;
        case 2:
          y = (y + 1) % height;
          break;
        case 3:
          y = (y + height - 1) % height;
          break;
      }

      const pixelColour = img.get(x, y);
      const newColour = mix(mixColour, pixelColour, step, 10000 - step);
      img.set(x, y, newColour);
    }
  }

  img.writeOut(__filename, i + 1);
});
