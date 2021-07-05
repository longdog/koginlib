const Pattern = require("./Pattern");
const { generatePattern } = require("./utils");
const { createCanvas } = require("canvas");

/**
 * Kogin pattern factory
 * @param {number} width
 * @param {number} heigt
 * @param {number} stitchStep one stitch length
 * @param {number} stitchWeight stitch weight
 * @param {number} gridWeight grid line weight
 * @return {function} New pattern factory method
 */
function patternFactory(width, height, stitchStep, stitchWeight) {
  /**
   * New pattern factory method
   * @param {string} pattern in string format
   * @param {boolean} withGrid daraw grid or no
   * @return {Pattern} pattern object
   */
  return (patternStr, withGrid = true) => {
    const canvas = createCanvas(width, height);
    const p = new Pattern(canvas, stitchStep, stitchWeight);
    p.draw(patternStr, withGrid);
    return p;
  };
}

function patternGenerator(pattern, withGrid) {
  return function* (isSymmetric) {
    while (true) {
      const p = generatePattern(isSymmetric);
      yield pattern(p, withGrid);
    }
  };
}

module.exports = { patternFactory, patternGenerator };
