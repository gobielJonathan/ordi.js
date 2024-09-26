import { mergeWithCustomize, customizeObject } from "webpack-merge";
import { Configuration, rspack } from "@rspack/core";

import common from "./rspack.config";

export default mergeWithCustomize<Configuration>({
  customizeObject: customizeObject({
    plugins: "append",
  }),
})(common, {
  mode: "production",
  plugins: [new rspack.ProgressPlugin({ prefix: "server" })],
});
