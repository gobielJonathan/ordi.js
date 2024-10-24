import { rspack } from "@rspack/core";
import { RspackDevServer as DS } from "@rspack/dev-server";

import generateDevHost from "../../utils/dev-host";
import { withOrdiConfig } from "../../utils/load-config";

const getServerCompiler = () => {
  const { default: serverConfig } = require("../rspack/server/rspack.dev");
  const config = withOrdiConfig(serverConfig, { isServer: true });
  return rspack(config);
};

const getClientCompiler = () => {
  const { default: clientConfig } = require("../rspack/client/rspack.dev");
  const config = withOrdiConfig(clientConfig, { isServer: false });
  return rspack(config);
};

const start = async () => {
  try {
    const devHostClient = await generateDevHost();
    process.env.PORT_SERVER = devHostClient.portServer;

    process.env.PORT_CLIENT = devHostClient.portClient;
    process.env.HOST_CLIENT = devHostClient.hostClient;

    const client = getClientCompiler();
    const server = getServerCompiler();

    const { hostname } = new URL(String(process.env.HOST_NAME));

    const ds = new DS(
      {
        port: process.env.PORT_CLIENT,
        compress: true,
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
            port: process.env.PORT_CLIENT, // The WebSocket port for HMR
          },
        },
      },
      client
    );

    ds.start();

    const WATCH_OPTIONS = {
      aggregateTimeout: 300,
      poll: 1000,
    };
    server.watch(WATCH_OPTIONS, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default start;
