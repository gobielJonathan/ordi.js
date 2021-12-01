const path = require("path");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
  }),
})(common, {
  mode: "development",
  module: {
    rules: [],
  },
  devServer: {
    port: Number(process.env.PORT_CLIENT),
    historyApiFallback: true,
    compress: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  devtool: "eval-source-map",
});
