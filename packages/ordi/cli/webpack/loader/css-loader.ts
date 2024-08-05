import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ifProd from "../../../utils/ifProd";
import ifDev from "../../../utils/ifDev";
import ifElse from "../../../utils/ifElse";

interface CssLoaderContext {
  isServer?: boolean;
}

export const cssLoader = (ctx: CssLoaderContext) => {
  const ifClient = ifElse(!ctx.isServer);

  return [
    {
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: [
        ifClient(
          ifProd({
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: process.env.ASSET_PREFIX,
            },
          })
        ),
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
        {
          loader: require.resolve("postcss-loader"),
        },
      ].filter(Boolean),
    },

    {
      test: /\.module\.css$/,
      use: [
        ifClient(
          ifProd({
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: process.env.ASSET_PREFIX,
            },
          })
        ),
        ifDev({
          loader: require.resolve("style-loader"),
        }),
        {
          loader: require.resolve("css-loader"),
          options: {
            importLoaders: 2,
            esModule: false,
            modules: {
              exportOnlyLocals: ifDev(false, true),
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
