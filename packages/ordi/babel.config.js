module.exports = {
  targets: "> 0.25%, not dead",
  ignore: ["node_modules"],
  plugins: [
    "@babel/transform-runtime"
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        targets: "> 0.25%, not dead",
        corejs: 3,
        loose: true,
        modules: false
      },
    ],
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  sourceMaps: "inline",
};
