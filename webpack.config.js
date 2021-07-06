module.exports = {
  entry: {
    koginlib: [`./lib/index.js`],
  },
  output: {
    library: {
      name: "koginlib",
      type: "umd",
    },
    globalObject: "this",
  },
  externals: {
    canvas: {
      commonjs: "canvas",
      commonjs2: "canvas",
      amd: "canvas",
      root: "canvas",
    },
  },
};
