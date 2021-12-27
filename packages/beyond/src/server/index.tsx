require("dotenv").config();

import { _500 } from "@beyond/default/error";
import type { FastifyReply, FastifyRequest } from "fastify";
import fastify from "fastify";

/**
 * middleware
 */
import registerMiddleware from "./middleware";

const Server = () => {
  const app = fastify({
    disableRequestLogging: true,
  });

  (async function () {
    await app.register(registerMiddleware);

    app.setErrorHandler(function (
      error: Error,
      _request: FastifyRequest,
      reply: FastifyReply
    ) {
      app.log.error(error);
      reply.code(500).type("text/html").send(error?.toString());
    });
  })();

  return {
    start: async () => {
      await app.listen(Number(process.env.PORT_SERVER));
    },
    close: async () => {
      app.close();
    },
  };
};

export default Server;
