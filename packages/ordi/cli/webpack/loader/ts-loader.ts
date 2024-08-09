import ifDev from "../../../utils/ifDev";

export const clientLoader = {
  test: /\.(ts|js)x?$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      plugins: [
        ifDev(require.resolve("react-refresh/babel")),
        "@loadable/babel-plugin",
      ].filter(Boolean),
      presets: [
        "@babel/preset-typescript",
        ["@babel/preset-react", { runtime: "automatic", useBuiltIns: true }],
        [
          "@babel/preset-env",
          {
            useBuiltIns: "entry",
            targets: "> 0.25%, not dead",
            corejs: 3,
            modules: false,
          },
        ],
      ],
    },
  },
};

export const serverLoader = {
  test: /\.(ts|js)x?$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      plugins: ["@babel/plugin-transform-runtime", "@loadable/babel-plugin"],
      presets: [
        "@babel/preset-typescript",
        ["@babel/preset-react", { runtime: "automatic", useBuiltIns: true }],
        [
          "@babel/preset-env",
          {
            useBuiltIns: "entry",
            targets: "> 0.25%, not dead",
            corejs: 3,
            modules: false,
          },
        ],
      ],
    },
  },
};
