require("dotenv").config();
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@beyond/client": path.resolve(process.cwd(), "src", "client"),
      "@beyond/server": path.resolve(process.cwd(), "src", "server"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
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
              esModule: true,
              modules: {
                namedExport: true,
                localIdentName: "css-[contenthash]",
              },
            },
          },
        ],
      },
    ],
  },
};
