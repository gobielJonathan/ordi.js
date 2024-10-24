import { rspack } from "@rspack/core";

import ifDev from "../../../utils/ifDev";

export const cssLoader = () => {
  return [
    {
      test: /\.css$/,
      exclude: /\.module\.css$/,
      type: "javascript/auto",
      use: [
        {
          loader: rspack.CssExtractRspackPlugin.loader,
          options: {
            publicPath: process.env.HOST_CLIENT,
          },
        },
        {
          loader: require.resolve("css-loader"),
          options: {
            importLoaders: 2,
            esModule: false,
          },
        },
        {
          loader: require.resolve("postcss-loader"),
        },
      ].filter(Boolean),
    },

    {
      test: /\.module\.css$/,
      type: "javascript/auto",
      use: [
        {
          loader: rspack.CssExtractRspackPlugin.loader,
          options: {
            publicPath: process.env.HOST_CLIENT,
          },
        },
        {
          loader: require.resolve("css-loader"),
          options: {
            importLoaders: 2,
            esModule: false,
            modules: {
              localIdentName: ifDev(
                "[local]--[hash:base64:5]",
                "[hash:base64:5]"
              ),
            },
          },
        },
        {
          loader: require.resolve("postcss-loader"),
        },
      ].filter(Boolean),
    },
  ];
};
