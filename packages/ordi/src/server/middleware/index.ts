import type { FastifyInstance } from "fastify";
import renderMiddleware from "./renderer";
import { log } from "../../shared/log";

export default function registerMiddleware(
  fastify: FastifyInstance,
  _opts: Record<string, unknown>,
  next: Function
) {
  fastify.addHook("onRequest", (req, _, done) => {
    log(`Accessing URL : ${req.url}`);
    done();
  });
  fastify.register(renderMiddleware);
  next();
}
