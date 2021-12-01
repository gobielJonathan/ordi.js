const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const shared = require("../webpack.shared");
const { default: LoadablePlugin } = require("@loadable/webpack-plugin");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
  }),
})(shared, {
  target: "node",
  entry: path.resolve(process.cwd(), "src/server", "index.js"),
  output: {
    path: path.resolve(process.cwd(), "build/server"),
    libraryTarget: "commonjs2",
  },
  externals: [nodeExternals()],
  resolve: {
    alias: {
      "@beyond/client": path.resolve(process.cwd(), "src", "client"),
      "@beyond/server": path.resolve(process.cwd(), "src", "server"),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || "true")),
    }),
    new MiniCssExtractPlugin({
      runtime: true,
      filename: `../client/[contenthash].css`,
    }),
    new LoadablePlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[contenthash].[ext]",
          outputPath: `../client/`,
          publicPath: `${process.env.HOST_CLIENT}`,
        },
      },
      {
        test: /\.m?js$/,
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
