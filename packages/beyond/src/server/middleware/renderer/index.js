const path = require("path");
const { renderToString } = require("react-dom/server");
const { default: Routes } = require("@beyond/client/component/routes");
const { getHeaders, getFooter } = require("./get-html-template");
const { HelmetProvider } = require("react-helmet-async");
const { ChunkExtractor } = require("@loadable/server");
const { StaticRouter, matchPath } = require("react-router-dom");
const { default: routes } = require("@beyond/client/routes");
const { isPromise } = require("@beyond/server/utils/sync");
const { renderStylesToString } = require("@emotion/server");
const statsFile = path.resolve(__dirname, "./loadable-stats.json");

module.exports = function rendererMiddleware(fastify, opts, next) {
  fastify.get("*", async (req, reply) => {
    try {
      let helmetContext = { helmet: {} };
      let routerContext = {};

      const extractor = new ChunkExtractor({
        statsFile,
        publicPath: process.env.HOST_CLIENT,
      });

      const component =
        routes?.find((data) => matchPath(req.url, data.path))?.component ?? {};

      let result = {};

      if (component?.getServerSideProps) {
        let { props = null } = await component?.getServerSideProps(req);
        //TODO: will be refactor
        /** if data from props, has async, resolve first */
        if (props) {
          for (const key in props) {
            const resolveData = props[key];
            if (isPromise(resolveData)) props[key] = await resolveData();
            props[key] = resolveData;
          }
          Object.assign(result, props);
        }
      }
      const body = renderStylesToString(
        renderToString(
          extractor.collectChunks(
            <HelmetProvider context={helmetContext}>
              <StaticRouter context={routerContext} location={req.url}>
                <Routes {...result} />
              </StaticRouter>
            </HelmetProvider>
          )
        )
      );

      let htmlState = {
        helmet: helmetContext.helmet,
        extractor,
        initialData: result,
      };

      let statusCode = Number(routerContext?.status ?? 200);

      if (routerContext.url) {
        reply.redirect(301, routerContext.url);
      }

      reply
        .code(statusCode)
        .type("text/html")
        .send(`${getHeaders(htmlState)}${body}${getFooter(htmlState)}`);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send(error?.toString());
    }
  });
  next();
};
