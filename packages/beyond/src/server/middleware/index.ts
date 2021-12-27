import type { FastifyInstance } from "fastify";
import renderMiddleware from "./renderer";

export default function registerMiddleware(
  fastify: FastifyInstance,
  _opts: Record<string, unknown>,
  next: Function
) {
  fastify.register(renderMiddleware);
  next();
}
