import { rspack } from "@rspack/core";

import config from "../rspack/client/rspack.prod";

const getClientCompiler = () => {
  return rspack(config);
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
    await buildClient();
  } catch (error) {
    // errorLog(error);
    console.error(error);
    process.exit(1);
  }
};

export default build;
