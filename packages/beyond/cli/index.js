#!/usr/bin/env node
const yargs = require("yargs");

const noop = () => {};

yargs
  .command("serve", "start the dev server", noop, (argv) => {
    require("@babel/register")({
      babelrc: false,
      extensions: [".ts", ".js", ".tsx", ".jsx"],
      configFile: "./babel.config.js",
    });
    require("./cmd/dev")();
  })
  .parse();
