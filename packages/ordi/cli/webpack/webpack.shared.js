const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { default: ifDev } = require("../../src/utils/ifDev");

const resolver = require("./resolve");
const defaultProcessEnv = require("./plugins/DefinePlugin").default;

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    symlinks: true,
    alias: {
      ...resolver,
    },
  },

  plugins: [
    new webpack.DefinePlugin(defaultProcessEnv),
    new MiniCssExtractPlugin({
      runtime: true,
      filename: ifDev("[name].css", "[name].[contenthash].css"),
      chunkFilename: ifDev("[id].css", "[id].[contenthash].css"),
    })
  ],

  module: {
    strictExportPresence: true,

    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        loader: require.resolve("file-loader"),
        options: {
          name: ifDev("[name].[ext]", "[contenthash].[ext]"),
          publicPath: process.env.HOST_CLIENT,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: process.env.HOST_CLIENT,
            },
          },
          {
            loader: require.resolve("css-loader"),
            options: {
              esModule: false,
              modules: {
                localIdentName: ifDev(
                  "[local]--[hash:base64:5]",
                  "[hash:base64:5]"
                ),
              },
            },
          },
        ],
      },
    ],
  },
};
