import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import resolver from "./resolve";
import defaultProcessEnv from "./plugins/DefinePlugin";
import ifDev from "../../src/utils/ifDev";

const shared = {
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
    }),
  ],

  module: {
    strictExportPresence: true,

    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-typescript",
              [
                "@babel/preset-react",
                { runtime: "automatic", useBuiltIns: true },
              ],
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  targets: "> 0.25%, not dead",
                  corejs: 3,
                  modules: false,
                },
              ],
            ],
          },
        },
      },

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

export default shared;
