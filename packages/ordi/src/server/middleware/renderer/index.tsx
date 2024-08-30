import { renderToString } from "react-dom/server";
import type { FastifyInstance } from "fastify";

import _500 from "@BUILD_500";
import _404 from "@BUILD_404";
import ROUTES from "@BUILD_ROUTE";

import render from "./render";
import Incremental from "../incremental";
import { findRoute } from "../../shared/route";
import * as logger from "../../../shared/log";

export default function rendererMiddleware(
  fastify: FastifyInstance,
  _opts: Record<string, unknown>,
  next: Function
) {
  const incremental = new Incremental();

  fastify.get("/*", async (req, reply) => {
    try {
      const { matches, component } = findRoute(ROUTES, req.url);

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
          .headers({ "x-ordi-ssg": "true" })
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
      if (isSSG && component?.getStaticProps) {
        let { props = {}, revalidate: _revalidate = -1 } =
          await component.getStaticProps(req);
        routerProps = props;
        revalidate = _revalidate;
      }

      const { status, html, redirect } = await render({ req, routerProps });

      if (status === 301) {
        return reply.redirect(redirect, 301);
      }

      if (isSSG) {
        incremental.set(req, html, revalidate);
      }

      reply.code(status).type("text/html").send(html);
    } catch (error) {
      let errorMsg: any = error;
      if (errorMsg.stack) errorMsg = errorMsg.stack;

      fastify.log.error(errorMsg);
      logger.error(errorMsg + "");

      reply
        .code(500)
        .type("text/html")
        .send(
          renderToString(
            <_500
              message={
                process.env.NODE_ENV !== "production"
                  ? String(errorMsg)
                  : "Internal Server Error"
              }
            />
          )
        );
    }
  });
  next();
}
