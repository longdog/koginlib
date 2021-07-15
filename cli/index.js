const { createWriteStream, readFileSync } = require("fs");

const { patternNodeFactory, patternGenerator } = require("../dist/koginlib");

function getImage(canvas, filepath) {
  const out = createWriteStream(filepath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The PNG file was created."));
}

function getPatternFile(filepath) {
  const patternFile = readFileSync(filepath);
  return patternFile.toString();
}

const DOT = 20;
const STITCH_LINE = 5;
const [CANVAS_WIDTH, CANVAS_HEIGHT] = [29 * DOT + DOT / 2, 280.5];

const canvasSize = {
  width: CANVAS_WIDTH * 2,
  height: CANVAS_HEIGHT * 2 - DOT,
};

const stitch = {
  stitchStep: DOT,
  stitchWeight: STITCH_LINE,
};

const pattern = patternNodeFactory(canvasSize, stitch);

const argArr = process.argv;

const args = argArr.reduce((obj, el) => {
  const kv = el.split("=");
  obj[kv[0]] = kv[1] ?? "";
  return obj;
}, {});
let p = undefined;
const withGrid = !args.hasOwnProperty("--nogrid");
if (args["--pattern"]) {
  p = pattern(getPatternFile(args["--pattern"]), withGrid);
} else {
  const g = patternGenerator(pattern, withGrid)(true);
  p = g.next().value;
}

const path = args["--output"] ?? __dirname + "/pattern.png";
getImage(p.canvas, path);
