import Webpack from "webpack";
import WDS from "webpack-dev-server";

import devServerConfig from "../webpack/dev-server";
import webpackClient from "../webpack/client/webpack.dev";
import webpackServer from "../webpack/server/webpack.dev";

const getServerCompiler = () => {
  return Webpack(webpackServer);
};

const getClientCompiler = () => {
  return Webpack(webpackClient);
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

export default start;
