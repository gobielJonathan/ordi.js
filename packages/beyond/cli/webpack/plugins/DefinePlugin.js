import { readFileSync } from "fs";
import path from "path";

let env = {};

try {
  //read all env
  const envFile = readFileSync(path.resolve(process.cwd(), ".env"), {
    encoding: "utf8",
  });

  envFile.split("\n").forEach((envValue) => {
    if (envValue.trim().length > 0) {
      const [key, value] = envValue.split("=");
      if (key && value) {
        env[`process.env.${key}`] = value;
      }
    }
  });
} catch (error) {
  console.error(error);
}

export default {
  __DEV__: JSON.stringify(process.env.NODE_ENV === "development"),
  __PROD__: JSON.stringify(process.env.NODE_ENV === "production"),
  ...env,
};
