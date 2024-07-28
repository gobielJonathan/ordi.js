import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import resolver from "./resolve";
import { cssLoader, cssModulesLoader } from "./loader/css-loader";
import defaultProcessEnv from "./plugins/DefinePlugin";

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

  plugins: [
    new webpack.DefinePlugin(defaultProcessEnv),
    ifProd(
      new MiniCssExtractPlugin({
        runtime: true,
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
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
          name: ifDev("[name].[ext]", "[contenthash].[ext]"),
          publicPath: process.env.HOST_CLIENT,
        },
      },

      cssLoader,
      cssModulesLoader,
    ],
  },
};

export default shared;
