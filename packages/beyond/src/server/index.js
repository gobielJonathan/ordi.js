require("dotenv").config();
const path = require("path");
const fastify = require("fastify")({ logger: !__DEV__ });

/**
 * middleware
 */
const registerMiddleware = require("./middleware");
try {
  (async function () {
    await fastify.register(registerMiddleware);

    fastify.register(require("fastify-static"), {
      root: path.join(__dirname, "..", "client"),
      prefix: process.env.ASSET_PREFIX, // optional: default '/'
    });

    fastify.setErrorHandler(function (error, request, reply) {
      fastify.log.error(error);
      reply.code(500).send("something wrong in backend, we will fix soon...");
    });
    await fastify.listen(Number(process.env.PORT_SERVER));
  })();
} catch (error) {
  fastify.log.error(error);
  compiler.close();
}
