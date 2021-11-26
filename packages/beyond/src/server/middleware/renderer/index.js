import fp from "fastify-plugin";

export default fp(function (fastify, opts, next) {
  fastify.decorate("renderer", null);
  fastify.register(function (req, reply, done) {
    reply.code(200).send("send from renderer middleware");
    done();
  });
  next();
});
