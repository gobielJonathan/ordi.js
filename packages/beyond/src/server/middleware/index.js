module.exports = function registerMiddleware(fastify, opts, next) {
  fastify.register(require("./renderer"));
  next();
};
