import type { FastifyInstance } from "fastify";
import path from "path";
import fp from "fastify-plugin";

import renderMiddleware from "./renderer";
import logMiddleware from "./logger";

export default function registerMiddleware(
  fastify: FastifyInstance,
  _opts: Record<string, unknown>,
  next: Function
) {
  if (__DEV__) {
    fastify.register(require("@fastify/http-proxy"), {
      upstream: `${process.env.HOST_NAME}:${process.env.PORT_CLIENT}`,
      prefix: process.env.ASSET_PREFIX,
      rewritePrefix: process.env.ASSET_PREFIX,
    });
  }

  if (__PROD__) {
    fastify.register(require("@fastify/static"), {
      root: path.join(__dirname, "..", "client"),
      prefix: process.env.ASSET_PREFIX,
    });
  }

  if (process.env.POWERED_BY) {
    fastify.register(
      fp(
        (fastify, _opts, next) => {
          fastify.addHook("onSend", (_, res, __, done) => {
            res.header("x-powered-by", "ordijs");
            done();
          });
          next();
        },
        { name: "powerby-plugin" }
      )
    );
  }

  if (process.env.IS_USE_LOGGING) {
    fastify.register(fp(logMiddleware, { name: "log-plugin" }));
  }

  fastify.register(fp(renderMiddleware, { name: "render-plugin" }));
  next();
}
