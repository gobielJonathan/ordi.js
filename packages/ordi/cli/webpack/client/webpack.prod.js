const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    output: "append",
  }),
})(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
});
