import { mergeWithCustomize, customizeObject } from "webpack-merge";
import { Configuration } from "@rspack/core";

import common from "./rspack.config";

export default mergeWithCustomize<Configuration>({
  customizeObject: customizeObject({}),
})(common, {
  mode: "development",
});
