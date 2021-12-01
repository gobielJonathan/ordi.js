const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const shared = require("../webpack.shared");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
    plugins: "append",
  }),
})(shared, {
  entry: [
    "@babel/polyfill",
    path.resolve(process.cwd(), "src", "client", "index.js"),
  ],
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
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: `[contenthash].[ext]`,
          publicPath: `${process.env.HOST_CLIENT}`,
        },
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
  output: {
    clean: true,
    publicPath: `${process.env.HOST_CLIENT}/`,
  },
  output: {
    clean: true,
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), "public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      insert: function (linkTag) {
        const preloadLinkTag = document.createElement("link");
        preloadLinkTag.rel = "preload";
        preloadLinkTag.as = "style";
        preloadLinkTag.href = linkTag.href;
        document.head.appendChild(preloadLinkTag);
        document.head.appendChild(linkTag);
      },
    }),
  ],
});
