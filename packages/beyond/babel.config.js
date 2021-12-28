module.exports = {
  presets: [
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        targets: "> 0.25%, not dead",
      },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
  ],
};
