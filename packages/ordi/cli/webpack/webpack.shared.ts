import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import resolver from "./resolve";

import ifDev from "../../utils/ifDev";
import ifProd from "../../utils/ifProd";

const shared: webpack.Configuration = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    symlinks: true,
    alias: {
      ...resolver,
    },
  },

  output: {
    clean: true,
  },

  plugins: [
    ifProd(
      new MiniCssExtractPlugin({
        runtime: true,
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
        ignoreOrder: true,
      })
    ),
  ].filter(Boolean),

  module: {
    strictExportPresence: true,

    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        loader: require.resolve("file-loader"),
        options: {
          name: ifDev("[name].[ext][query]", "[contenthash].[ext][query]"),
          publicPath: process.env.ASSET_PREFIX,
          outputPath: "../client",
        },
      },
    ],
  },
};

export default shared;
