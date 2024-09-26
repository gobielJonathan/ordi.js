import { rspack, type Configuration } from "@rspack/core";
import LoadablePlugin from "@loadable/webpack-plugin";
import { mergeWithCustomize, customizeObject } from "webpack-merge";

import shared from "../rspack.shared";
import resolveCwd from "../../../utils/resolve";
import ifDev from "../../../utils/ifDev";

import { clientLoader } from "../loader/ts-loader";
import { cssLoader } from "../loader/css-loader";

import { clientVars } from "../plugins/DefinePlugin";

const WEBPACK_OPTIMIZATION_REGEX_FRAMEWORK_CORE =
  /[\\/]node_modules.*(react|react-dom|react-router|react-router-dom|react-helmet-async|@loadable)[\\/]/;
console.log("process.env ", process.env);
export default mergeWithCustomize<Configuration>({
  customizeObject: customizeObject({
    "module.rules": "prepend",
    plugins: "append",
    output: "append",
  }),
})(shared, {
  entry: resolveCwd("src/client/index.ts"),

  output: {
    publicPath: `${process.env.HOST_CLIENT}${process.env.ASSET_PREFIX}`,
    path: resolveCwd("build/client"),
  },

  plugins: [
    new rspack.DefinePlugin(clientVars),
    new LoadablePlugin({ writeToDisk: true }),
  ],

  module: {
    rules: [...clientLoader, ...cssLoader({})],
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
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
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

    minimize: true,
    minimizer: [new rspack.CssExtractRspackPlugin()],
  },
});
