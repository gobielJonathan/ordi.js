const { renderToString } = require("react-dom/server");
const { default: App } = require("@beyond/client/app.js");
const { getHeaders, getFooter } = require("./get-html-template");
const { HelmetProvider } = require("react-helmet-async");

module.exports = function rendererMiddleware(fastify, opts, next) {
  fastify.get("*", (req, reply) => {
    let helmetContext = { helmet: {} };
    const app = renderToString(
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    );

    let htmlState = { helmet: helmetContext.helmet };

    reply
      .code(200)
      .type("text/html")
      .send(`${getHeaders(htmlState)}${app}${getFooter()}`);
  });
  next();
};
