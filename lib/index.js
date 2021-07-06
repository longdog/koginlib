const Pattern = require("./Pattern");
const { generatePattern } = require("./utils");

/**
 * Kogin pattern factory for node.js
 * @param {number} width
 * @param {number} heigt
 * @param {number} stitchStep one stitch length
 * @param {number} stitchWeight stitch weight
 * @param {number} gridWeight grid line weight
 * @return {function} New pattern factory method
 */
function patternNodeFactory(width, height, stitchStep, stitchWeight) {
  /**
   * New pattern factory method
   * @param {string} pattern in string format
   * @param {boolean} withGrid daraw grid or no
   * @return {Pattern} pattern object
   */
  return (patternStr, withGrid = true) => {
    const canvas = require("canvas").createCanvas(width, height);
    const p = new Pattern(canvas, stitchStep, stitchWeight);
    p.draw(patternStr, withGrid);
    return p;
  };
}

/**
 * Kogin pattern factory for browser
 * @param {object} canvas
 * @param {number} stitchStep one stitch length
 * @param {number} stitchWeight stitch weight
 * @param {number} gridWeight grid line weight
 * @return {function} New pattern factory method
 */
function patternBrowserFactory(canvas, stitchStep, stitchWeight) {
  /**
   * New pattern factory method
   * @param {string} pattern in string format
   * @param {boolean} withGrid daraw grid or no
   * @return {Pattern} pattern object
   */
  return (patternStr, withGrid = true) => {
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

module.exports = {
  patternNodeFactory,
  patternBrowserFactory,
  patternGenerator,
};
