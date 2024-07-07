import { type Configuration } from "webpack";
import { mergeWithCustomize, customizeObject } from "webpack-merge";
import common from "./webpack.config";

export default mergeWithCustomize<Configuration>({
  customizeObject: customizeObject({
    output: "append",
  }),
})(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
});
