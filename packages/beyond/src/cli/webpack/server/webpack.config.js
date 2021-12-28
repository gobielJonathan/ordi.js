const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const shared = require("../webpack.shared");
const { default: LoadablePlugin } = require("@loadable/webpack-plugin");
const WebpackBar = require("webpackbar");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
  }),
})(shared, {
  target: "node",
  entry: path.resolve(process.cwd(), "src/server", "index.ts"),
  output: {
    path: path.resolve(process.cwd(), "build/server"),
    library: {
      type: "commonjs2",
    },
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV === "development"),
      __PROD__: JSON.stringify(process.env.NODE_ENV === "production"),
    }),
    new MiniCssExtractPlugin({
      runtime: true,
    }),
    new LoadablePlugin(),
    new WebpackBar({ name: "server", color: "#FFBD35" }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[contenthash].[ext]",
          outputPath: `../client/`,
          publicPath: process.env.HOST_CLIENT,
        },
      },
      {
        test: /\.(tsx?|jsx?)/gm,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-transform-modules-commonjs",
              "@babel/transform-runtime",
              "@babel/plugin-syntax-dynamic-import",
              "@loadable/babel-plugin",
            ],
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
    ],
  },
});
