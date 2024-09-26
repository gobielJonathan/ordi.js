import { mergeWithCustomize, customizeObject } from "webpack-merge";
import { type Configuration } from "@rspack/core";
import ReactRefreshPlugin from "@rspack/plugin-react-refresh";

import common from "./rspack.config";

export default mergeWithCustomize<Configuration>({
  customizeObject: customizeObject({
    plugins: "append",
    "optimization.minimize": "replace",
  }),
})(common, {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [new ReactRefreshPlugin()],
  stats: "errors-only",
  optimization: { minimize: false },
});
