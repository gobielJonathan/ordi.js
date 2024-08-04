import Webpack from "webpack";
import WDS from "webpack-dev-server";

import devServerConfig from "../webpack/dev-server";
import webpackClient from "../webpack/client/webpack.dev";
import webpackServer from "../webpack/server/webpack.dev";

import { withOrdiConfig } from "../../utils/load-config";
import { checkPort } from "../../utils/port";

const getServerCompiler = async () => {
  // const newPortServer = await checkPort(
  //   Number(process.env.PORT_SERVER ?? "4001"),
  //   3
  // );
  // process.env.PORT_SERVER = String(newPortServer);

  return Webpack(withOrdiConfig(webpackServer, { isServer: true }));
};

const getClientCompiler = async () => {
  // const newPortClient = await checkPort(devServerConfig.port, 3);
  // process.env.PORT_CLIENT = String(newPortClient);
  // devServerConfig.port = newPortClient;
  return Webpack(withOrdiConfig(webpackClient, {}));
};

const WATCH_OPTIONS = {
  aggregateTimeout: 300,
  poll: 1000,
};

const start = async () => {
  try {
    const client = await getClientCompiler();
    const server = await getServerCompiler();

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
