const path = require("path");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
    output: "append",
    output: "append",
  }),
})(common, {
  output: {
    clean: true,
  },
  mode: "production",
  output: {
    path: path.resolve(process.cwd(), "build", "client"),
    filename: "[name].js",
  },
  module: {
    rules: [],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          chunks: "initial",
          filename: "vendors~main.js",
          priority: 1,
          maxInitialRequests: 2,
          minChunks: 1,
        },
      },
    },
  },
});
