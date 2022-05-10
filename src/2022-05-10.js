const { collectColours, fillCircle, emptyData, loadImg } = require("./tools");

["flowers1.png", "flowers4.png"].forEach((file, i) => {
  const colourGroups = collectColours({ img: loadImg(file) }).reduce(
    (acc, col) => {
      const key = `${col.r}_${col.g}_${col.b}`;
      const group = (acc[key] = acc[key] || []);
      group.push(col);
      return acc;
    },
    {}
  );

  const img = emptyData();
  const circle = fillCircle(img);

  Object.values(colourGroups)
    .sort((a, b) => b.length - a.length)
    .filter((_, n) => n % 10 === 0)
    .forEach(group => {
      const middle = group[Math.floor(group.length / 2)];
      circle(middle.x, middle.y, group.length / 2, middle);
    });

  img.writeOut(__filename, i + 1);
});
