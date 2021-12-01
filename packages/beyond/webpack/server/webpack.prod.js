const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
  }),
})(common, {
  mode: "production",
  module: {
    rules: [],
  },
  devtool: "source-map",
});
