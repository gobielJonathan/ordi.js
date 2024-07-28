import Webpack from "webpack";
import webpackConfig from "../webpack/client/webpack.prod";

const getClientCompiler = () => {
  return Webpack(webpackConfig);
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
