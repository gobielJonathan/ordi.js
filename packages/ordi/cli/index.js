#!/usr/bin/env node
const path = require("path");
const yargs = require("yargs");
const { register } = require("ts-node");

const noop = () => {};

function registerSwc() {
  register({
    swc: true,
    emit: false,
    transpileOnly: true,
    cwd: path.resolve(__dirname, "../../.."),
  });
}

yargs
  .command("serve", "start the dev server", noop, () => {
    registerSwc();
    require("./cmd/dev")();
  })

  .command("build:server", "build the server", noop, () => {
    registerSwc();
    require("./cmd/build-server").default();
  })

  .command("build:client", "build the client", noop, () => {
    registerSwc();
    require("./cmd/build-client").default();
  })

  .parse();
