import path from "path";
import type { HelmetData } from "react-helmet-async";
import { StaticRouter, StaticRouterProps } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import type { FastifyRequest } from "fastify";

import Document from "@DOCUMENT";
import App from "@APP";

import { removeURLParameter } from "../../utils/url";
import { HtmlProvider } from "../../../shared/context/html";
import ContextProvider from "../../../shared/context";
import Routes from "../../../router";

type StaticRouterContext = StaticRouterProps["context"];

/**
 * get from build/client
 */
const statsFile = path.resolve(__dirname, "../client/loadable-stats.json");

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
  return renderToString(
    <HtmlProvider
      helmet={helmetContext as unknown as HelmetData["context"]["helmet"]}
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
    statsFile
  });

  const AppTree = (
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter context={routerContext} location={url}>
        <ContextProvider
          helmetContext={helmetContext}
          routerProps={routerProps}
        >
          <App>
            <Routes />
          </App>
        </ContextProvider>
      </StaticRouter>
    </ChunkExtractorManager>
  );

  const appHTML = renderToString(AppTree);

  const body = renderDocument({
    helmetContext: helmetContext.helmet,
    extractor,
    routerProps,
    html: appHTML,
  });

  let statusCode = Number(routerContext.status || 200);
  let redirect = "";

  if (routerContext.url) {
    statusCode = 301;
    redirect = routerContext.url;
  }

  return { status: statusCode, html: body, redirect };
}
