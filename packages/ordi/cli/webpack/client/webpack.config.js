const WebpackBar = require("webpackbar");
const { default: LoadablePlugin } = require("@loadable/webpack-plugin");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const shared = require("../webpack.shared");
const { default: resolveCwd } = require("../../../src/utils/resolve");
const { default: ifDev } = require("../../../src/utils/ifDev");

const WEBPACK_OPTIMIZATION_REGEX_FRAMEWORK_CORE =
  /[\\/]node_modules.*(react|react-dom|react-router|react-router-dom|react-helmet-async|@loadable)[\\/]/;

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
    plugins: "append",
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
    new FriendlyErrorsWebpackPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-react", { runtime: "automatic", useBuiltIns: true }],
              "@babel/preset-typescript",
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  targets: "> 0.25%, not dead",
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    usedExports: true, 
    moduleIds: 'named',
    chunkIds: 'named',
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
          filename: ifDev("[name].js","[name].[contenthash].js"),
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
