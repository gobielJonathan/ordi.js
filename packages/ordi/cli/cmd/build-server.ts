import Webpack from "webpack";
import webpackConfig from '../webpack/server/webpack.prod'

const getServerCompiler = () => {
  return Webpack(webpackConfig);
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

module.exports = build;
