import { Configuration, rspack } from "@rspack/core";

import resolver from "./resolve";

import ifProd from "../../utils/ifProd";

const shared: Configuration = {
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".js", ".jsx"],
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
      new rspack.CssExtractRspackPlugin({
        runtime: true,
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
        ignoreOrder: true,
      })
    ),
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};

export default shared;
