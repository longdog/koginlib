const { createWriteStream, readFileSync } = require("fs");

const { patternNodeFactory, patternGenerator } = require("../dist/koginlib");

function getImage(canvas, filepath) {
  const out = createWriteStream(filepath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The PNG file was created."));
}

const DOT = 20;
const STITCH_LINE = 5;
const [CANVAS_WIDTH, CANVAS_HEIGHT] = [29 * DOT + DOT / 2, 280.5];

const pattern = patternNodeFactory(
  {
    width: CANVAS_WIDTH * 2,
    height: CANVAS_HEIGHT * 2 - DOT,
  },
  {
    stitchStep: DOT,
    stitchWeight: STITCH_LINE,
  }
);

const argArr = process.argv;

const args = argArr.reduce((obj, el) => {
  const kv = el.split("=");
  obj[kv[0]] = kv[1] ?? "";
  return obj;
}, {});
let canvas = undefined;
const withGrid = !args.hasOwnProperty("--nogrid");
if (args["--pattern"]) {
  const patternFile = readFileSync(args["--pattern"]);
  canvas = pattern(patternFile.toString(), withGrid).canvas;
} else {
  const g = patternGenerator(pattern, withGrid)(true);
  canvas = g.next().value.canvas;
}

const path = args["--output"] ?? __dirname + "/pattern.png";
getImage(canvas, path);
