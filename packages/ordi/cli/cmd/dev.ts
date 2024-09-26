import { rspack } from "@rspack/core";
import { RspackDevServer as DS } from "@rspack/dev-server";

import { checkPort } from "../../utils/port";

const getServerCompiler = () => {
  const { default: serverConfig } = require("../rspack/server/rspack.dev");
  return rspack(serverConfig);
};

const getClientCompiler = () => {
  const { default: clientConfig } = require("../rspack/client/rspack.dev");
  return rspack(clientConfig);
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

    const hostname = new URL(process.env.HOST_NAME ?? "http://localhost")
      .hostname;

    const ds = new DS(
      {
        port: portClient,
        compress: true,
        devMiddleware: { serverSideRender: true },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers":
            "X-Requested-With, content-type, Authorization",
        },
        client: {
          webSocketURL: {
            hostname: hostname,
            port: portClient, // The WebSocket port for HMR
          },
        },
      },
      client
    );

    ds.start();

    server.watch(WATCH_OPTIONS, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default start;
