module.exports = {
  targets: "> 0.25%, not dead",
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
    "@babel/transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@loadable/babel-plugin",
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
};
