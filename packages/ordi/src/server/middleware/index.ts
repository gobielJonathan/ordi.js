import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import renderMiddleware from "./renderer";
import logMiddleware from "./logger";

import path from "path";

export default function registerMiddleware(
  fastify: FastifyInstance,
  _opts: Record<string, unknown>,
  next: Function
) {
  if (__PROD__) {
    fastify.register(require("@fastify/static"), {
      root: path.join(__dirname, "..", "client"),
      prefix: process.env.ASSET_PREFIX,
    });
  }
  fastify.register(fp(logMiddleware, { name: "log-plugin" }));

  fastify.register(fp(renderMiddleware, { name: "render-plugin" }));
  next();
}
