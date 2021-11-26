const path = require("path");
const fastify = require("fastify")({ logger: true });
const serveStatic = require("serve-static");

const webpack = require("webpack");

/**
 * middleware
 */
const registerMiddleware = require("./middleware");

const webpackConfig = require(path.resolve(
  process.cwd(),
  "webpack/server/webpack.dev.js"
));

const compiler = webpack(webpackConfig);
const { publicPath = "/" } = webpackConfig.output;

try {
  (async function () {
    await fastify.register(require("fastify-express"));
    await fastify.use(
      require("webpack-dev-middleware")(compiler, {
        publicPath,
      })
    );
    await fastify.register(registerMiddleware);
    // fastify.use("*", serveStatic(path.join(process.cwd(), "build", "client")));

    fastify.setErrorHandler(function (error, request, reply) {
      fastify.log.error(error);
      reply.code(500).send("something wrong in backend, we will fix soon...");
    });
    await fastify.listen(3001);
  })();
} catch (error) {
  fastify.log.error(error);
  compiler.close();
}
