import path from "path";
import {
  getFooter,
  getHeaders,
} from "../middleware/renderer/get-html-template";

import { ChunkExtractor } from "@loadable/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { renderStylesToString } from "@emotion/server";
import Routes from "@beyond/client/component/routes";
import { removeURLParameter } from "../utils/url";

const statsFile = path.resolve(__dirname, "./loadable-stats.json");

export default function render({ routerProps = {}, req = {} }) {
  const url = removeURLParameter(req.url);
  let helmetContext = { helmet: {} };
  let routerContext = { status: 200 };

  const extractor = new ChunkExtractor({
    statsFile,
    publicPath: process.env.HOST_CLIENT,
  });

  const body = renderStylesToString(
    renderToString(
      extractor.collectChunks(
        <HelmetProvider context={helmetContext}>
          <StaticRouter context={routerContext} location={url}>
            <Routes {...routerProps} />
          </StaticRouter>
        </HelmetProvider>
      )
    )
  );

  let htmlState = {
    helmet: helmetContext.helmet,
    extractor,
    initialData: routerProps,
  };

  const bodyContent = `${getHeaders(htmlState)}${body}${getFooter(htmlState)}`;

  let statusCode = Number(routerContext?.status ?? 200);
  let redirect = "";

  if (routerContext.url) {
    statusCode = 301;
    redirect = routerContext.url;
  }

  return { status: statusCode, html: bodyContent, redirect };
}
