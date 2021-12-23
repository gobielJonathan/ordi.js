import renderMiddleware from "./renderer/index";

export default function registerMiddleware(fastify, opts, next) {
  fastify.register(renderMiddleware);
  next();
}
