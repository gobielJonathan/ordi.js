import fas from "fastify";
import "./middleware/renderer";

const fastify = (function createFastify() {
  return fas({ logger: true });
})();

// fastify.register(rendererMiddleware);

fastify.get("/test", async (request, reply) => {
  reply.code(200).send({ hello: "json" });
});

const start = async () => {
  try {
    await fastify.listen(3001);
    console.log("listening PORT 3001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
