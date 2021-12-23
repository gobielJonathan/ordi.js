import path from "path";
import Document from "@beyond/default/_document";

import { ChunkExtractor } from "@loadable/server";
import { StaticRouter } from "react-router-dom";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { renderStylesToString } from "@emotion/server";
import { removeURLParameter } from "@beyond/server/utils/url";
import { HtmlProvider } from "@beyond/shared/context/html/index";
import ContextProvider from "@beyond/shared/context/index";
import Routes from "@beyond/router/index";
import App from "@beyond/default/_app";

const statsFile = path.resolve(__dirname, "./loadable-stats.json");

function renderDocument({ helmetContext, extractor, html, routerProps }) {
  return renderToStaticMarkup(
    <HtmlProvider
      helmet={helmetContext}
      extractor={extractor}
      html={html}
      routerProps={routerProps}
    >
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
