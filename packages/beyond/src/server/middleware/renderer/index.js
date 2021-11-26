import p from "path";
const fp = require("fastify-plugin");
const path = require("path");
const { renderToString } = require("react-dom/server");
// const { default: App } = require(path.resolve(
//   process.cwd(),
//   "src",
//   "client",
//   "app.js"
// ));

module.exports = function rendererMiddleware(fastify, opts, next) {
  fastify.get("*", (req, reply) => {
    reply.code(200).send(req.url);
  });
  next();
};
