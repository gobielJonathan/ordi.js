import { type Configuration } from "webpack";
import WebpackBar from "webpackbar";
import { mergeWithCustomize, customizeObject } from "webpack-merge";

import common from "./webpack.config";

export default mergeWithCustomize<Configuration>({
  customizeObject: customizeObject({
    plugins: "append",
  }),
})(common, {
  mode: "production",
  plugins: [new WebpackBar({ name: "server", color: "#FFBD35" })],
});
