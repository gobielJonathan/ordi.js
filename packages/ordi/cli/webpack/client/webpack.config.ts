import WebpackBar from "webpackbar";
import { type Configuration } from "webpack";
import LoadablePlugin from "@loadable/webpack-plugin";
import { mergeWithCustomize, customizeObject } from "webpack-merge";

import shared from "../webpack.shared";
import resolveCwd from "../../../src/utils/resolve";
import ifDev from "../../../src/utils/ifDev";
import { clientLoader } from "../loader/ts-loader";

const WEBPACK_OPTIMIZATION_REGEX_FRAMEWORK_CORE =
  /[\\/]node_modules.*(react|react-dom|react-router|react-router-dom|react-helmet-async|@loadable)[\\/]/;

export default mergeWithCustomize<Configuration>({
  customizeObject: customizeObject({
    "module.rules": "prepend",
    "plugins": "append",
  }),
})(shared, {
  entry: resolveCwd("src/client/index.ts"),

  output: {
    clean: true,
    publicPath: `${process.env.HOST_CLIENT}/`,
    path: resolveCwd("build/client"),
  },

  plugins: [
    new WebpackBar({ name: "client" }),
    new LoadablePlugin({ writeToDisk: true }),
  ],

  module : {
    rules : [clientLoader]
  }, 

  optimization: {
    usedExports: true,
    moduleIds: "named",
    chunkIds: "named",
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        framework: {
          name: "framework",
          test: (module) => {
            const resource = module.nameForCondition() || "";
            return WEBPACK_OPTIMIZATION_REGEX_FRAMEWORK_CORE.test(resource);
          },
          chunks: "all",
          priority: 40,
          enforce: true,
          filename: ifDev("[name].js", "[name].[contenthash].js"),
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
