const webpack = require("webpack");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const WriteFilePlugin = require("write-file-webpack-plugin");

const common = require("./webpack.config");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    plugins: "append",
  }),
})(common, {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin(), new WriteFilePlugin()],
});
