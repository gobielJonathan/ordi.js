const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const common = require("./webpack.config");
const webpack = require("webpack");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
    plugins: "append",
  }),
})(common, {
  mode: "development",
  module: {
    rules: [],
  },
  devtool: "eval-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
