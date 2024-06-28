const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");

const shared = require("../webpack.shared");
const { default: resolveCwd } = require("../../../src/utils/resolve");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
    resolve: "append",
  }),
})(shared, {
  target: "node",
  entry: [
    require.resolve("webpack/hot/poll") + "?1000",
    resolveCwd("src/server/index.ts"),
  ],
  optimization: {
    minimize: false,
  },
  output: {
    path: resolveCwd("build/server"),
    clean: true,
    libraryTarget: "commonjs",
  },
  plugins: [
    new WebpackBar({ name: "server", color: "#FFBD35" }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
