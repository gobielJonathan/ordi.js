const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const common = require("./webpack.config");
const webpack = require("webpack");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
  }),
})(common, {
  mode: "development",
  module: {
    rules: [],
  },
});
