const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
  }),
})(common, {
  mode: "production",
});
