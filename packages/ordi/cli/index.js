#!/usr/bin/env node
const path = require("path");
const yargs = require("yargs");
const { register } = require("ts-node");

require("dotenv-safe").config({
  allowEmptyValues: true,
});

const noop = () => {};

function registerSwc() {
  register({
    swc: true,
    emit: false,
    transpileOnly: true,
    cwd: path.resolve(__dirname, "../"),
  });
}

yargs
  .middleware((argv) => {
    const [cmd] = argv._;
    if (cmd.startsWith("build")) {
      process.env.NODE_ENV = "production";
      process.env.BABEL_ENV = "production";
    } else {
      process.env.NODE_ENV = "development";
      process.env.BABEL_ENV = "development";
    }
  })
  .command("serve", "start the dev server", noop, () => {
    registerSwc();
    require("./cmd/dev").default();
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
