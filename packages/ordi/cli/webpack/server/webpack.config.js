const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");

const shared = require("../webpack.shared");
const { default: resolveCwd } = require("../../../src/utils/resolve");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
    plugins: "append",
  }),
})(shared, {
  target: "node",
  entry: [
    require.resolve("webpack/hot/poll") + "?1000",
    resolveCwd("src/server/index.ts"),
  ],
  optimization: {
    minimize: false,
  },
  output: {
    path: resolveCwd("build/server"),
    clean: true,
  },
  plugins: [
    new WebpackBar({ name: "server", color: "#FFBD35" }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-typescript",
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "entry",
                    targets: "> 0.25%, not dead",
                    corejs: 3,
                  },
                ],
                [
                  "@babel/preset-react",
                  { runtime: "automatic", useBuiltIns: true },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
});
