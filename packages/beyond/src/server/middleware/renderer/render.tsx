import path from "path";
import Document from "@DOCUMENT";

import { ChunkExtractor } from "@loadable/server";
import { StaticRouter } from "react-router-dom";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { renderStylesToString } from "@emotion/server";
import { removeURLParameter } from "../../utils/url";
import { HtmlProvider } from "../../../shared/context/html";
import ContextProvider from "../../../shared/context";
import Routes from "../../../router";
import App from "@APP";
import type { FastifyRequest } from "fastify";
import type { StaticRouterContext } from "react-router";
import type { HelmetData } from "react-helmet-async";

const statsFile = path.resolve(__dirname, "./loadable-stats.json");

function renderDocument({
  helmetContext,
  extractor,
  html,
  routerProps,
}: {
  helmetContext: Record<string, unknown>;
  extractor: ChunkExtractor;
  html: string;
  routerProps: Record<string, unknown>;
}) {
  return renderToStaticMarkup(
    <HtmlProvider
      helmet={helmetContext as unknown as HelmetData}
      extractor={extractor}
      html={html}
      routerProps={routerProps}
    >
      <Document />
    </HtmlProvider>
  );
}

export default function render({
  routerProps,
  req,
}: {
  routerProps: Record<string, unknown>;
  req: FastifyRequest;
}) {
  const url = removeURLParameter(req.url);
  let helmetContext = { helmet: {} };
  let routerContext: StaticRouterContext & { status?: number } = {
    status: 200,
  };

  const extractor = new ChunkExtractor({
    statsFile,
    publicPath: process.env.HOST_CLIENT,
  });

  const AppTree = extractor.collectChunks(
    <StaticRouter context={routerContext} location={url}>
      <ContextProvider helmetContext={helmetContext} routerProps={routerProps}>
        <App>
          <Routes />
        </App>
      </ContextProvider>
    </StaticRouter>
  );

  const appHTML = renderStylesToString(renderToString(AppTree));

  const body = renderDocument({
    helmetContext: helmetContext.helmet,
    extractor,
    routerProps,
    html: appHTML,
  });

  let statusCode = Number(routerContext?.status ?? 200);
  let redirect = "";

  if (routerContext.url) {
    statusCode = 301;
    redirect = routerContext.url;
  }

  return { status: statusCode, html: body, redirect };
}
