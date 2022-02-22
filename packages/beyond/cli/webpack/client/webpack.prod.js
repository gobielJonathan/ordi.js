const path = require("path");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    output: "append",
  }),
})(common, {
  mode: "production",
  output: {
    path: path.resolve(process.cwd(), "build", "client"),
    filename: "[name].js",
  },
  optimization: {
    usedExports: true,
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
