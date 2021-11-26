const path = require("path");

module.exports = {
  target: "node",
  entry: path.resolve(process.cwd(), "src/server", "index.js"),
  output: {
    path: path.resolve(process.cwd(), "build/server"),
  },
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
    ],
  },
};
