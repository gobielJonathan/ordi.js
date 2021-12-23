import path from "path";
import { Document } from "@beyond/server/shared/document";

import { ChunkExtractor } from "@loadable/server";
import { StaticRouter } from "react-router-dom";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { renderStylesToString } from "@emotion/server";
import { removeURLParameter } from "@beyond/server/utils/url";
import { HtmlProvider } from "@beyond/shared/context/html";
import { ContextProvider } from "@beyond/shared/context/index";
import Routes from "@beyond/router";
import App from "@beyond/default/_app";

const statsFile = path.resolve(__dirname, "./loadable-stats.json");

function renderDocument({ helmetContext, extractor, html }) {
  return renderToStaticMarkup(
    <HtmlProvider helmet={helmetContext} extractor={extractor} html={html}>
      <Document />
    </HtmlProvider>
  );
}

export default function render({ routerProps = {}, req = {} }) {
  const url = removeURLParameter(req.url);
  let helmetContext = { helmet: {} };
  let routerContext = { status: 200 };

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

  const body = renderDocument({ helmetContext, extractor, html: appHTML });

  let statusCode = Number(routerContext?.status ?? 200);
  let redirect = "";

  if (routerContext.url) {
    statusCode = 301;
    redirect = routerContext.url;
  }

  return { status: statusCode, html: body, redirect };
}
