#!/usr/bin/env node
const path = require("path");
const yargs = require("yargs");

const noop = () => {};

yargs
  .command("serve", "start the dev server", noop, (argv) => {
    require("@babel/register")({
      extensions: [".ts", ".js", ".tsx", ".jsx"],
      ignore: [/node_modules/],
      root: path.join(__dirname, ".."),
    });
    require("./cmd/dev")();
  })
  .parse();
