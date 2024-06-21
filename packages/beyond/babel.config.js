module.exports = {
  targets: "> 0.25%, not dead",
  ignore: ["node_modules"],
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
    "@babel/transform-runtime",
    "@babel/plugin-syntax-dynamic-import"
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        targets: "> 0.25%, not dead",
        corejs: 3,
      },
    ],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  sourceMaps: "inline",
};
