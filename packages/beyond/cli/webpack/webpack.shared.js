const { default: resolveCwd } = require("../../src/utils/resolve");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const resolver = require("./resolve").resolver;

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    symlinks: true,
    alias: {
      "@beyond": resolveCwd(),
      ...resolver,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: process.env.HOST_CLIENT,
            },
          },
          {
            loader: "css-loader",
            options: {
              esModule: false,
              modules: {
                localIdentName: "css-[contenthash]",
              },
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
};
