const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@beyond": path.resolve(process.cwd(), "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: `${process.env.HOST_CLIENT}`,
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
