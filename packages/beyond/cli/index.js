#!/usr/bin/env node
const path = require("path");
const yargs = require("yargs");

const noop = () => {};

const babelOptions = {
  extensions: [".ts", ".tsx", ".jsx", ".js"],
  ignore: [/node_modules/],
  root: path.join(__dirname, ".."),
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
  .parse();
