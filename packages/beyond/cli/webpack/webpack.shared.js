const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const resolver = require("./resolve").resolver;
const webpack = require("webpack");
const defaultProcessEnv = require("./plugins/DefinePlugin").default;

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    symlinks: true,
    alias: {
      ...resolver,
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      ...defaultProcessEnv,
    }),
  ],

  module: {
    strictExportPresence: true,

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
