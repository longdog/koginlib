(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Pattern", "./utils"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Pattern"), require("./utils"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Pattern, global.utils);
    global.KoginLib = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Pattern, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _Pattern = _interopRequireDefault(_Pattern);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

  function nodePattern(width, height, stitchStep, stitchWeight) {
    if (isBrowser()) {
      throw new Error("in browser use browserPattern(canvas, stitchStep, stitchWeight)");
    } //const { createCanvas } = require("canvas");


    const {
      createCanvas
    } = eval("require")("canvas");
    const canvas = createCanvas(width, height);
    return (0, _Pattern.default)(canvas, stitchStep, stitchWeight);
  }

  function browserPattern(canvas, stitchStep, stitchWeight) {
    return (0, _Pattern.default)(canvas, stitchStep, stitchWeight);
  }

  function patternGenerator(pattern) {
    return function* (isSymmetric) {
      while (true) {
        yield pattern((0, _utils.generatePattern)(isSymmetric));
      }
    };
  }

  var _default = {
    nodePattern,
    browserPattern,
    patternGenerator
  };
  _exports.default = _default;
});
