import { FastifyInstance } from "fastify";
import { log } from "../../../shared/log";

export default function logMiddleware(
  fastify: FastifyInstance,
  _opts: Record<string, unknown>,
  next: Function
) {
  fastify.addHook("onRequest", (req, _, done) => {
    log(`Accessing URL : ${req.url}`);
    done();
  });
  next();
}
