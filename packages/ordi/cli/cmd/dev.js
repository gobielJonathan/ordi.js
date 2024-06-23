import devServerConfig from "../webpack/dev-server";
import Webpack from "webpack";
import WDS from "webpack-dev-server";

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
    console.error(error);
    process.exit(1);
  }
};

module.exports = start;
