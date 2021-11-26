const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.(css)/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[contenthash].[ext]",
          esModule: false,
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@beyond": path.resolve(process.cwd(), "src", "client"),
    },
  },
  output: {
    clean: true,
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), "public", "index.html"),
    }),
  ],
};
