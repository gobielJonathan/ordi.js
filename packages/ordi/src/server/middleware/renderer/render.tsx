import { ReactNode } from "react";

import path from "path";
import type { HelmetData } from "react-helmet-async";
import { StaticRouter, StaticRouterProps } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import type { FastifyRequest } from "fastify";

import Document from "@DOCUMENT";
import App from "@APP";

import { removeURLParameter } from "../../utils/url";
import { HtmlProvider } from "../../../shared/context/html";
import ContextProvider from "../../../shared/context";
import { FetchProvider } from "../../../shared/context/fetch";
import Routes from "../../../router";
import Collector from "../../../utils/collector";

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
  fetchProps,
}: {
  helmetContext: Record<string, unknown>;
  extractor: ChunkExtractor;
  html: string;
  routerProps: Record<string, unknown>;
  fetchProps: Record<string, unknown>;
}) {
  return renderToStaticMarkup(
    <HtmlProvider
      helmet={helmetContext as unknown as HelmetData["context"]["helmet"]}
      extractor={extractor}
      html={html}
      routerProps={routerProps}
      fetchProps={fetchProps}
    >
      <Document />
    </HtmlProvider>
  );
}

async function getDataFromTree(
  app: ReactNode
): Promise<{ html: string; fetchState: Record<string, unknown> }> {
  const collector = Collector();

  async function process(): Promise<string> {
    const element = <FetchProvider collector={collector}>{app}</FetchProvider>;
    const html = renderToStaticMarkup(element);
    if (!collector.hasPromise()) return html;
    await collector.runAllPromise();
    return process();
  }

  const html = await process();

  return { html: html, fetchState: collector.getResolved() };
}

export default async function render({
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

  const { html: appHTML, fetchState } = await getDataFromTree(AppTree);

  const body = renderDocument({
    helmetContext: helmetContext.helmet,
    extractor,
    routerProps,
    html: appHTML,
    fetchProps: fetchState,
  });

  let statusCode = Number(routerContext.status || 200);
  let redirect = "";

  if (routerContext.url) {
    statusCode = 301;
    redirect = routerContext.url;
  }

  return { status: statusCode, html: body, redirect };
}
