import _500 from "@BUILD_500";
import type { FastifyReply, FastifyRequest } from "fastify";
import fastify from "fastify";

/**
 * middlewares
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
      try {
        await app.listen(Number(process.env.PORT_SERVER));
      } catch (error) {
        throw error;
      }
    },
    close: async () => {
      app.close();
    },
  };
};

export default Server;
