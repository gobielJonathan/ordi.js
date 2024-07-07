import { mergeWithCustomize, customizeObject } from "webpack-merge";
import { type Configuration } from "webpack";
import { RunScriptWebpackPlugin } from "run-script-webpack-plugin";

import common from "./webpack.config";

export default mergeWithCustomize<Configuration>({
  customizeObject: customizeObject({
    plugins: "append",
  }),
})(common, {
  mode: "development",
  devtool: "source-map",
  plugins: [
    new RunScriptWebpackPlugin({
      name: "main.js",
    }),
  ],
});
