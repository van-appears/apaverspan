const { distance, emptyData, loadImg } = require("./tools");

[
  [600, 900],
  [800, 800],
  [900, 600]
].forEach(([centreX, centreY], i) => {
  const img = emptyData();
  const { width, height } = img;
  const src = loadImg("location1.png");
  const distances = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      distances.push({
        x,
        y,
        d: distance(x, y, centreX, centreY)
      });
    }
  }
  distances.sort((a, b) => a.d - b.d);

  for (let index = 0; index < distances.length; index++) {
    const front = distances[index];
    const back = distances[distances.length - 1 - index];
    img.set(front.x, front.y, src.get(back.x, back.y));
  }

  img.writeOut(__filename, i + 1);
});
