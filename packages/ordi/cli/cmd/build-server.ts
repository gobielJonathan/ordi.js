import Webpack from "webpack";

const getServerCompiler = () => {
  const webpackConfig = require("../webpack/server/webpack.prod");
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
