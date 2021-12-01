const path = require("path");
const { renderToString } = require("react-dom/server");
const { default: Routes } = require("@beyond/client/component/routes");
const { getHeaders, getFooter } = require("./get-html-template");
const { HelmetProvider } = require("react-helmet-async");
const { ChunkExtractor } = require("@loadable/server");
const { StaticRouter, matchPath } = require("react-router-dom");
const { default: routes } = require("@beyond/client/routes");
const { isPromise } = require("@beyond/server/utils/sync");
const { IncrementalSSG } = require("../incremental");
const { default: _500 } = require("@beyond/server/template/_500");

const statsFile = path.resolve(__dirname, "./loadable-stats.json");

module.exports = function rendererMiddleware(fastify, opts, next) {
  fastify.get("*", async (req, reply) => {
    try {
      /** if exists in incremental cache, it's i-ssg */
      const [htmlCache, statusRegeneration] = IncrementalSSG.get(req);
      if (htmlCache) {
        reply
          .code(200)
          .headers({ "x-render": "i-ssg" })
          .type("text/html")
          .send(htmlCache);
        if (!statusRegeneration) return;
      }

      let helmetContext = { helmet: {} };
      let routerContext = {};

      const extractor = new ChunkExtractor({
        statsFile,
        publicPath: process.env.HOST_CLIENT,
      });

      const component =
        routes?.find((data) => matchPath(req.url, data.path))?.component ?? {};

      let result = {};
      let incrementalTime = 0;

      if (component?.getServerSideProps)
        throw new Error("getServerSideProps not support revalidate");

      if (component?.getServerSideProps || component?.getStaticProps) {
        let getDataInitial =
          component?.getServerSideProps || component?.getStaticProps;

        let { props = null, revalidate = undefined } = await getDataInitial(
          req
        );

        incrementalTime = revalidate;

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

      const bodyContent = `${getHeaders(htmlState)}${body}${getFooter(
        htmlState
      )}`;

      let statusCode = Number(routerContext?.status ?? 200);

      if (routerContext.url) {
        reply.redirect(301, routerContext.url);
      }

      if (!!incrementalTime) {
        IncrementalSSG.put(req, bodyContent, incrementalTime);
      }
      reply.code(statusCode).type("text/html").send(bodyContent);
    } catch (error) {
      fastify.log.error(error);
      reply
        .code(500)
        .type("text/html")
        .send(renderToString(<_500 message={error?.toString()} />));
    }
  });
  next();
};
