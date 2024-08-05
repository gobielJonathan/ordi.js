import path from "path";
import type { Configuration } from "webpack";

export interface OrdiConfig {
  basePath?: string;
  assetPrefix?: string;
  generateBuildId?: () => Promise<string>;
  logging?: boolean;
  poweredByHeader?: boolean;
  webpack?: (props: {
    webpack: Configuration;
    isServer?: boolean;
  }) => Configuration;

  devServer?: {
    port?: number;
    hostname?: number;
  };
}

const ROOT_PATH = process.cwd();

const resolveCwd = (_path: string = "") => {
  return path.resolve(ROOT_PATH, _path);
};

export default function loadConfig() {
  const configPath = resolveCwd("ordi.config.js");
  const config = require(configPath) as OrdiConfig;
  const {
    assetPrefix = "/static/",
    basePath = "",
    logging = true,
    poweredByHeader = true,
    devServer = { hostname: "http://localhost", port: 4000 },
    webpack,
    generateBuildId,
  } = config;

  return {
    assetPrefix,
    basePath,
    logging,
    poweredByHeader,
    devServer,
    webpack,
    generateBuildId,
  };
}

export const withOrdiConfig = (
  config: Configuration,
  context: {
    isServer?: boolean;
  }
) => {
  const { webpack } = loadConfig();
  if (webpack) return webpack({ webpack: config, isServer: context.isServer });
  return config;
};
