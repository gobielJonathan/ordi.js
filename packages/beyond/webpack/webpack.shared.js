require("dotenv").config();
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@beyond/client": path.resolve(process.cwd(), "src", "client"),
      "@beyond/server": path.resolve(process.cwd(), "src", "server"),
      "@beyond/page": path.resolve(process.cwd(), "src", "client/pages"),
      "@beyond/component": path.resolve(
        process.cwd(),
        "src",
        "client/component"
      ),
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
