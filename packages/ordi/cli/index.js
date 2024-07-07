#!/usr/bin/env node
const path = require("path");
const yargs = require("yargs");

const noop = () => {};

const babelOptions = {
  extensions: [".ts", ".tsx", ".jsx", ".js"],
  ignore: [/node_modules/],
  root: path.join(__dirname, ".."),
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
  ],
  presets: [
    "@babel/preset-typescript",
  ],
  babelrc: false,
};

yargs
  .command("serve", "start the dev server", noop, () => {
    require("@babel/register")(babelOptions);
    require("./cmd/dev")();
  })

  .command("build:server", "build the server", noop, () => {
    require("@babel/register")(babelOptions);
    require("./cmd/build-server")();
  })

  .command("build:client", "build the client", noop, () => {
    require("@babel/register")(babelOptions);
    require("./cmd/build-client")();
  })

  .parse();
