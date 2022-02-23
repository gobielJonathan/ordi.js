const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const shared = require("../webpack.shared");
const { default: LoadablePlugin } = require("@loadable/webpack-plugin");
const WebpackBar = require("webpackbar");
const { default: resolveCwd } = require("../../../src/utils/resolve");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
    plugins: "append",
  }),
})(shared, {
  target: "node",
  entry: [
    require.resolve("webpack/hot/poll") + "?1000",
    resolveCwd("server/index.ts"),
  ],
  optimization: {
    minimize: false,
  },
  output: {
    path: resolveCwd("../build/server"),
    library: {
      type: "commonjs2",
    },
  },
  // externals: [nodeExternals({ allowlist: [/^beyond/] })],
  plugins: [
    new MiniCssExtractPlugin({
      runtime: true,
    }),
    new LoadablePlugin(),
    new WebpackBar({ name: "server", color: "#FFBD35" }),
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({
      name: "main.js",
    }),
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
              ["@babel/preset-react", { runtime: "automatic" }],
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
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[contenthash].[ext]",
          outputPath: `../client/`,
          publicPath: process.env.HOST_CLIENT,
        },
      },
    ],
  },
});
