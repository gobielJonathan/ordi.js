import Webpack from "webpack";

const getClientCompiler = () => {
  const webpackConfig = require("../webpack/client/webpack.prod");
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

module.exports = build;
