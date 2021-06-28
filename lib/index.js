const patternFactory = require("./Pattern");
const { generatePattern } = require("./utils");
const { createCanvas } = require("canvas");

function newPattern(width, height, stitchStep, stitchWeight) {
  const canvas = createCanvas(width, height);
  return patternFactory(canvas, stitchStep, stitchWeight);
}

function patternGenerator(pattern, withGrid) {
  return function* (isSymmetric) {
    while (true) {
      yield pattern(generatePattern(isSymmetric), withGrid);
    }
  };
}

module.exports = { newPattern, patternGenerator };
