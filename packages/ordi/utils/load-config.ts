import { Configuration } from "@rspack/core";
import path from "path";
import crypto from "node:crypto";

export interface OrdiConfig {
  basePath?: string;
  assetPrefix?: string;
  generateBuildId?: () => string;
  logging?: boolean;
  poweredByHeader?: boolean;
  compiler?: (props: {
    instance: Configuration;
    isServer: boolean;
  }) => Configuration;

  devServer?: {
    port?: number;
    hostname?: string;
  };
}

const ROOT_PATH = process.cwd();

const resolveCwd = (_path: string = "") => path.resolve(ROOT_PATH, _path);

export default function loadConfig() {
  const configPath = resolveCwd("ordi.config.js");
  const config = require(configPath) as OrdiConfig;
  const {
    assetPrefix = "/static/",
    basePath = "",
    logging = true,
    poweredByHeader = true,
    devServer = { hostname: "http://localhost", port: 4000 },
    compiler,
    generateBuildId = () => crypto.randomBytes(16).toString("hex"),
  } = config;

  return {
    assetPrefix,
    basePath,
    logging,
    poweredByHeader,
    devServer,
    compiler,
    generateBuildId,
  };
}

export const withOrdiConfig = (
  config: Configuration,
  context: {
    isServer: boolean;
  }
) => {
  const { compiler } = loadConfig();
  if (compiler)
    return compiler({ instance: config, isServer: context.isServer });
  return config;
};
