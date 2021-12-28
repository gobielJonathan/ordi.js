require("dotenv").config();

const Webpack = require("webpack");
const WDS = require("webpack-dev-server");
const devServerConfig = require("../webpack/dev-server");
const errorLog = require("../../src/shared/log").error;

const getServerCompiler = () => {
  const webpackConfig = require("../webpack/server/webpack.dev");
  return Webpack(webpackConfig);
};

const getClientCompiler = () => {
  const webpackConfig = require("../webpack/client/webpack.dev");

  return Webpack(webpackConfig);
};

const WATCH_OPTIONS = {
  aggregateTimeout: 300,
  poll: 1000,
};

const start = async () => {
  try {
    const server = getServerCompiler();
    const client = getClientCompiler();

    const webpackDevServer = new WDS(devServerConfig, client);
    webpackDevServer.start();

    server.watch(WATCH_OPTIONS, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    errorLog(error);
    process.exit(1);
  }
};

module.exports = start;
