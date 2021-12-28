#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const path = require("path");

const noop = () => {};

yargs(hideBin(process.argv))
  .command("serve", "start the dev server", noop, (argv) => {
    require("@babel/register")({
      babelrc: false,
      extensions: [".tsx", ".ts"],
      configFile: "../babel.config.js",
    });
    require("./cmd/dev")();
  })
  .parse();
