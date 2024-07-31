import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ifProd from "../../../utils/ifProd";
import ifDev from "../../../utils/ifDev";

export const cssLoader = {
  test: /\.css$/,
  exclude: /\.module\.css$/,
  use: [
    ifProd({
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: process.env.HOST_CLIENT,
      },
    }),
    ifDev({
      loader: require.resolve("style-loader"),
    }),
    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 2,
        esModule: false,
      },
    },
  ].filter(Boolean),
};

export const cssModulesLoader = {
  test: /\.module\.css$/,
  use: [
    ifProd({
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: process.env.HOST_CLIENT,
      },
    }),
    ifDev({
      loader: require.resolve("style-loader"),
    }),
    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 2,
        esModule: false,
        modules: {
          localIdentName: ifDev("[local]--[hash:base64:5]", "[hash:base64:5]"),
        },
      },
    },
  ].filter(Boolean),
};
