const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const common = require("./webpack.config");
const webpack = require("webpack");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    plugins: "append",
  }),
})(common, {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
