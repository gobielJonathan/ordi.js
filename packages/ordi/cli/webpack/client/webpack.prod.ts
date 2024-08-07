import { type Configuration } from "webpack";
import { mergeWithCustomize, customizeObject } from "webpack-merge";
import WebpackBar from "webpackbar";

import common from "./webpack.config";

export default mergeWithCustomize<Configuration>({
  customizeObject: customizeObject({
    output: "merge",
  }),
})(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: process.env.ASSET_PREFIX,
  },
  plugins: [new WebpackBar({ name: "client" })],
});
