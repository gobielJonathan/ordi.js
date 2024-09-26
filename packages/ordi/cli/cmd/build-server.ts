import { rspack } from "@rspack/core";

import config from "../rspack/server/rspack.prod";

const getServerCompiler = () => {
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

const build = async () => {
  try {
    await buildServer();
  } catch (error) {
    // errorLog(error);
    console.error(error);
    process.exit(1);
  }
};

export default build;
