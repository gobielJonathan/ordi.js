import dotenv from "dotenv-safe";
import loadConfig from "../../../utils/load-config";
import ifProd from "../../../utils/ifProd";

const PUBLIC_VAR_PREFIX = "ORDI_PUBLIC";

const { parsed = {} } = dotenv.config({
  allowEmptyValues: true,
});

const tupleEnv = Object.entries(parsed);

const clientEnv = tupleEnv.filter(([key]) => key.startsWith(PUBLIC_VAR_PREFIX));
const serverEnv = tupleEnv;

const _clientVars = clientEnv.reduce(
  (acc, [key, value]) => ({
    ...acc,
    [`process.env.${key}`]: JSON.stringify(value),
  }),
  {}
);
const _serverVars = serverEnv.reduce(
  (acc, [key, value]) => ({
    ...acc,
    [`process.env.${key}`]: JSON.stringify(value),
  }),
  {}
);

const baseVars = {
  __DEV__: JSON.stringify(process.env.NODE_ENV === "development"),
  __PROD__: JSON.stringify(process.env.NODE_ENV === "production"),
};

export const clientVars = {
  ...baseVars,
  ..._clientVars,
};

const { generateBuildId, devServer, poweredByHeader, logging, assetPrefix } =
  loadConfig();

const buildID = ifProd(generateBuildId(), "");

export const serverVars = {
  ...baseVars,
  ..._serverVars,
  "process.env.BUILD_ID": JSON.stringify(buildID),
  "process.env.HOST_NAME": JSON.stringify(devServer.hostname),
  "process.env.PORT_SERVER": devServer.port,
  "process.env.POWERED_BY": poweredByHeader,
  "process.env.IS_USE_LOGGING": logging,
  "process.env.ASSET_PREFIX": JSON.stringify(assetPrefix),
};
