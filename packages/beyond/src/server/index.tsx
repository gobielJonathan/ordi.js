require("dotenv").config();
const fastify = require("fastify")({});

import { _500 } from "@beyond/default/error";
import type { FastifyReply, FastifyRequest } from "fastify";

/**
 * middleware
 */
import registerMiddleware from "./middleware";

try {
  (async function () {
    await fastify.register(registerMiddleware);

    fastify.setErrorHandler(function (
      error: Error,
      _request: FastifyRequest,
      reply: FastifyReply
    ) {
      fastify.log.error(error);
      reply.code(500).type("text/html").send(error?.toString());
    });
    await fastify.listen(Number(process.env.PORT_SERVER));
  })();
} catch (error) {
  fastify.log.error(error);
}
