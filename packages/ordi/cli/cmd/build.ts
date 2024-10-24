import { rspack } from "@rspack/core";
import generateDevHost from "../../utils/dev-host";
import { withOrdiConfig } from "../../utils/load-config";

const getClientCompiler = () => {
  const { default: clientConfig } = require("../rspack/client/rspack.prod");
  const config = withOrdiConfig(clientConfig, { isServer: false });
  return rspack(config);
};

const getServerCompiler = () => {
  const { default: serverConfig } = require("../rspack/server/rspack.prod");
  const config = withOrdiConfig(serverConfig, { isServer: true });
  return rspack(config);
};

const buildServer = async () => {
  const server = getServerCompiler();
  return new Promise<void>((resolve, reject) => {
    server.run((err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

const buildClient = async () => {
  const client = getClientCompiler();
  return new Promise<void>((resolve, reject) => {
    client.run((err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

const build = async () => {
  try {
    const devHostClient = await generateDevHost();
    process.env.PORT_SERVER = devHostClient.portServer;

    process.env.PORT_CLIENT = devHostClient.portClient;
    process.env.HOST_CLIENT = devHostClient.hostClient;

    await buildClient();
    await buildServer();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default build;
