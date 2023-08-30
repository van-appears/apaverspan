const { collectColours, wrapPosition } = require("./tools");
const avgImgData = require("./process/avg-img-data");

["flowers2.png", "flowers4.png"].forEach((file, i) => {
  const img = avgImgData();
  const { wrapX, wrapY } = wrapPosition(img);
  collectColours({ file }).forEach(({ r, g, b }) => {
    let x = Math.floor(r / 16);
    let y = r % 16;
    x += Math.floor(5.4 * b);
    y += Math.floor(5.4 * g);
    img.set(wrapX(x), wrapY(y), { r, g, b });
  });

  img.asImg().writeOut(__filename, i + 1);
});
