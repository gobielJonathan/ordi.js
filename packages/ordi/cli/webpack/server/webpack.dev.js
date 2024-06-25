const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");
const common = require("./webpack.config");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    plugins: "append",
  }),
})(common, {
  mode: "development",
  devtool: "source-map",
  plugins: [
    new RunScriptWebpackPlugin({
      name: "main.js"
    }),
  ],
});
