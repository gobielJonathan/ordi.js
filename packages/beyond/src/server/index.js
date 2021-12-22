require("dotenv").config();
const fastify = require("fastify")({});
import { _500 } from "./template";
/**
 * middleware
 */
const registerMiddleware = require("./middleware");
try {
  (async function () {
    await fastify.register(registerMiddleware);

    fastify.setErrorHandler(function (error, request, reply) {
      fastify.log.error(error);
      reply
        .code(500)
        .type("text/html")
        .send(renderToString(<_500 message={error?.toString()} />));
    });
    await fastify.listen(Number(process.env.PORT_SERVER));
  })();
} catch (error) {
  fastify.log.error(error);
  compiler.close();
}
