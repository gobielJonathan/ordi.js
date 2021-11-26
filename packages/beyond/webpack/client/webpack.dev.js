const path = require("path");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
  }),
})(common, {
  mode: "development",
  entry: path.resolve(process.cwd(), "src", "client", "index.js"),
  module: {
    rules: [],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
    compress: true,
  },
  devtool: "eval",
});
