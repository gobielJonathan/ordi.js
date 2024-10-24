import { Configuration, rspack } from "@rspack/core";
import resolver from "./resolve";

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
    new rspack.CssExtractRspackPlugin({
      ignoreOrder: true,
    }),
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
