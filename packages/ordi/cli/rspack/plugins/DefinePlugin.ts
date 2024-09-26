import path from "path";
import dotenv from "dotenv-safe";

const PUBLIC_VAR_PREFIX = "ORDI_PUBLIC";

const { parsed = {} } = dotenv.config({
  allowEmptyValues: true,
  example: path.resolve(process.cwd(), ".env"),
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

export const serverVars = {
  ...baseVars,
  ..._serverVars,
};
