const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const common = require("./webpack.config");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    plugins: "append",
  }),
})(common, {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [new ReactRefreshWebpackPlugin()],
});
