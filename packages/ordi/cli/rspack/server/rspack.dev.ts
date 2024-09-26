import { Configuration } from "@rspack/core";
import { mergeWithCustomize, customizeObject } from "webpack-merge";
import { RunScriptWebpackPlugin } from "run-script-webpack-plugin";

import common from "./rspack.config";

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
