const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  entry: path.resolve(process.cwd(), "src/server", "index.js"),
  output: {
    path: path.resolve(process.cwd(), "build/server"),
    libraryTarget: "commonjs2",
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-transform-modules-commonjs",
              "@babel/transform-runtime",
            ],
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
    ],
  },
};
