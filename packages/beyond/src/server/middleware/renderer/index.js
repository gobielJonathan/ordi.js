import { renderToString } from "react-dom/server";
import Incremental from "../incremental";
import { _500, _404 } from "@beyond/default/error/index";
import render from "./render";
import { findRoute } from "@beyond/server/shared/route";

export default function rendererMiddleware(fastify, opts, next) {
  const incremental = new Incremental();

  fastify.get("/*", async (req, reply) => {
    try {
      const { matches, component } = findRoute(req.url);

      if (!matches) {
        reply
          .code(404)
          .type("text/html")
          .send(renderToString(<_404 />));
        return;
      }

      let isSSG = !!component?.getStaticProps;
      let htmlCache;

      if (isSSG) htmlCache = incremental.get(req);

      if (htmlCache) {
        reply
          .code(200)
          .headers({ "x-beyond-ssg": true })
          .type("text/html")
          .send(htmlCache);
        return;
      }

      let routerProps = {};

      if (!isSSG && component?.getServerSideProps) {
        let { props = {} } = await component.getServerSideProps(req);
        routerProps = props;
      }

      let revalidate = -1;
      if (isSSG) {
        let { props = {}, revalidate: _revalidate = -1 } =
          await component.getStaticProps(req);
        routerProps = props;
        revalidate = _revalidate;
      }

      const { status, html, redirect } = render({ req, routerProps });

      if (status === 301) {
        reply.redirect(301, redirect);
        return;
      }

      if (isSSG) {
        incremental.set(req, html, revalidate);
      }

      reply.code(status).type("text/html").send(html);
    } catch (error) {
      fastify.log.error(error);
      reply
        .code(500)
        .type("text/html")
        .send(renderToString(<_500 message={error.stack} />));
    }
  });
  next();
}
