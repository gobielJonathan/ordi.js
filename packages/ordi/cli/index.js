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

  .middleware(() => {
    registerSwc();
  })

  .middleware(() => {
    const { default: loadConfig } = require("../utils/load-config");

    const { assetPrefix, basePath, devServer } = loadConfig();

    process.env.ASSET_PREFIX = assetPrefix;
    process.env.BASE_PATH = basePath;

    process.env.HOST_NAME = devServer.hostname;
    process.env.PORT_SERVER = devServer.port;
  })

  .command("serve", "start the dev server", noop, () => {
    require("./cmd/dev").default();
  })

  .command("build", "build the server", noop, () => {
    require("./cmd/build").default();
  })

  .parse();
