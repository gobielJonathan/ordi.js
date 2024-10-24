import type { ReactNode } from "react";
import { useHtmlContext } from "../context/html";

export const Html = ({ children }: { children: ReactNode }) => {
  return <html>{children}</html>;
};

export const Head = () => {
  const { helmet, extractor } = useHtmlContext();
  return (
    <head>
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      {helmet.script.toComponent()}
      {extractor.getLinkElements()}
      {extractor.getStyleElements()}
    </head>
  );
};

export const Scripts = () => {
  const { extractor, routerProps, fetchProps } = useHtmlContext();

  return (
    <>
      <script
        id="__ORDI_DATA__"
        dangerouslySetInnerHTML={{
          __html: `
          window.__ORDI_DATA__=${JSON.stringify(routerProps)}
          window.__ORDI_FETCH__=${JSON.stringify(fetchProps)}
          window.BUILD_ID=${JSON.stringify(process.env.BUILD_ID)}
        `,
        }}
      ></script>
      {extractor.getScriptElements()}
    </>
  );
};

export const Main = () => {
  const { html } = useHtmlContext();
  return <div id="__ordi" dangerouslySetInnerHTML={{ __html: html }} />;
};

export const Body = ({ children }: { children: ReactNode }) => {
  return <body>{children}</body>;
};
