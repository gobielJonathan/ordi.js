import Webpack from "webpack";
import WDS from "webpack-dev-server";

import devServerConfig from "../webpack/dev-server";

import { withOrdiConfig } from "../../utils/load-config";
import { checkPort } from "../../utils/port";

const getServerCompiler = () => {
  const webpackServer = require("../webpack/server/webpack.dev").default;
  return Webpack(withOrdiConfig(webpackServer, { isServer: true }));
};

const getClientCompiler = () => {
  const webpackClient = require("../webpack/client/webpack.dev").default;
  return Webpack(withOrdiConfig(webpackClient, {}));
};

const WATCH_OPTIONS = {
  aggregateTimeout: 300,
  poll: 1000,
};

const start = async () => {
  try {
    //check server port, if port used, increment the port
    const portServer = await checkPort(Number(process.env.PORT_SERVER), 3);
    process.env.PORT_SERVER = String(portServer);

    //check client port, if port used, increment the port
    const portClient = await checkPort(Number(portServer + 1), 3);
    /**
     * @note why we need port client, because we still use webpack to serve our static file
     */
    process.env.PORT_CLIENT = String(portClient);
    process.env.HOST_CLIENT = `${process.env.HOST_NAME}:${portClient}`;

    const client = getClientCompiler();
    const server = getServerCompiler();

    const webpackDevServer = new WDS(
      devServerConfig(
        new URL(process.env.HOST_NAME ?? "http://localhost").hostname,
        portClient
      ),
      client
    );
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
