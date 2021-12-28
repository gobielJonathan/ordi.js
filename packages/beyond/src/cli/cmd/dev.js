const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const getServerCompiler = () => {
  const webpackConfig = require("../webpack/server/webpack.dev");
  const compiler = Webpack(webpackConfig);
  return compiler;
};

const getClientCompiler = () => {
  const webpackConfig = require("../webpack/client/webpack.dev");

  const compiler = Webpack(webpackConfig);
  const devServerOptions = { ...webpackConfig.devServer };
  const server = new WebpackDevServer(devServerOptions, compiler);
  return server;
};

const WATCH_OPTIONS = {
  aggregateTimeout: 300,
  poll: 1000,
};

const start = async () => {
  const server = getServerCompiler();
  const client = getClientCompiler();
  client.start();

  server.watch(WATCH_OPTIONS, (err) => {
    if (err) throw err;
  });
};

module.exports = start;
