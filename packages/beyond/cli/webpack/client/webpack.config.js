const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const shared = require("../webpack.shared");
const WebpackBar = require("webpackbar");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
    plugins: "append",
  }),
})(shared, {
  entry: path.resolve(process.cwd(), "src", "client", "index.ts"),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: `[contenthash].[ext]`,
          publicPath: process.env.HOST_CLIENT,
        },
      },
    ],
  },
  output: {
    clean: true,
    publicPath: `${process.env.HOST_CLIENT}/`,
  },
  plugins: [
    new WebpackBar({ name: "client" }),
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
