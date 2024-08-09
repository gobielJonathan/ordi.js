import { mergeWithCustomize, customizeObject } from "webpack-merge";
import webpack, { type Configuration } from "webpack";
import { RunScriptWebpackPlugin } from "run-script-webpack-plugin";

import common from "./webpack.config";

export default mergeWithCustomize<Configuration>({
  customizeObject: customizeObject({
    plugins: "append",
    entry: "append",
  }),
})(common, {
  entry: [require.resolve("webpack/hot/poll") + "?1000"],
  mode: "development",
  devtool: "source-map",
  plugins: [
    new RunScriptWebpackPlugin({
      name: "main.js",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
