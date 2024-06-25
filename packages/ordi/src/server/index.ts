import type { FastifyReply, FastifyRequest } from "fastify";
import fastify from "fastify";
import _500 from "@BUILD_500";

import * as logger from "../shared/log";

/**
 * middlewares
 */
import registerMiddleware from "./middleware";

const Server = () => {

  const app = fastify({
    disableRequestLogging: true,
  });
  
  app.register(registerMiddleware);
  
  app.setErrorHandler(function (
    error: Error,
    _request: FastifyRequest,
    reply: FastifyReply
  ) {
    app.log.error(error.stack);
    logger.error(error.stack || "");
    reply.code(500).type("text/html").send(error?.stack?.toString());
  });

  return {
    start: async () => {
      try {
        await app.listen(Number(process.env.PORT_SERVER));
      } catch (error) {
        const _error = error instanceof Error ? error.message : String(error)
        logger.error(_error)
      }
    },
    close: async () => {
      await app.close();
    },
  };
};

export default Server;
