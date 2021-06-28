const { createWriteStream } = require("fs");

const { newPattern, patternGenerator } = require("../src");

function getImage(canvas, filepath) {
  const out = createWriteStream(filepath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The PNG file was created."));
}

const DOT = 20;
const STITCH_LINE = 5;
const [CANVAS_WIDTH, CANVAS_HEIGHT] = [29 * DOT + DOT / 2, 280.5];

const pattern = newPattern(
  CANVAS_WIDTH * 2,
  CANVAS_HEIGHT * 2 - DOT,
  DOT,
  STITCH_LINE
);

const g = patternGenerator(pattern)(true);

getImage(g.next().value.canvas, __dirname + "/test.png");
