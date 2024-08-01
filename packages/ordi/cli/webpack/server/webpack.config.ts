import webpack from "webpack";
import WebpackBar from "webpackbar";
import { type Configuration } from "webpack";

import { mergeWithCustomize, customizeObject } from "webpack-merge";

import shared from "../webpack.shared";
import resolveCwd from "../../../utils/resolve";

import { serverLoader } from "../loader/ts-loader";
import { cssLoader } from "../loader/css-loader";

export default mergeWithCustomize<Configuration>({
  customizeObject: customizeObject({
    "module.rules": "append",
    resolve: "append",
    output: "append",
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
    libraryTarget: "commonjs",
  },
  plugins: [
    new WebpackBar({ name: "server", color: "#FFBD35" }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [serverLoader, ...cssLoader({ isServer: true })],
  },
});
