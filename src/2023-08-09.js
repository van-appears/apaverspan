const { collectColours, colours, emptyData, wrapPosition } = require("./tools");

const imgs = ["location1.png", "flowers4.png", "flowers3.png", "flowers2.png"];
imgs.forEach((file, i) => {
  const img = emptyData();
  const { wrapX, wrapY } = wrapPosition(img);
  collectColours({ file }).forEach(({ h, s, v }) => {
    let x = Math.floor(h / 19);
    let y = h % 19;

    x += Math.floor(13.8 * s);
    y += Math.floor(13.8 * v);

    img.set(wrapX(x), wrapY(y), colours.WHITE);
  });

  img.writeOut(__filename, i + 1);
});
