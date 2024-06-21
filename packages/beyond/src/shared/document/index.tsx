import type { ReactNode } from "react";
import { useHtmlContext } from "../context/html";

function createScriptTag({
  src,
  type = "",
  nomodule = false,
  nonce = "",
}: {
  src: string;
  type?: string;
  nomodule?: boolean;
  nonce?: string;
}) {
  if (!src) return null;
  return (
    <script
      defer
      src={`${process.env.HOST_CLIENT}/${src}.js`}
      type={type}
      noModule={nomodule}
      crossOrigin={"anonymous"}
      nonce={nonce}
    />
  );
}

const mainScripts = ["main", "runtime", "vendors~main"]
  .map((src) => createScriptTag({ src }))
  .join("");

export const Html = ({ children }: { children: ReactNode }) => {
  return <html>{children}</html>;
};

export const Head = () => {
  const { helmet, extractor } = useHtmlContext();
  return (
    <head>
      {helmet?.title.toComponent()}
      {helmet?.meta.toComponent()}
      {helmet?.link.toComponent()}
      {helmet?.script.toComponent()}
      {extractor.getLinkElements()}
      {extractor.getStyleElements()}
    </head>
  );
};

export const Scripts = () => {
  const { extractor, routerProps } = useHtmlContext();
  return (
    <>
      <script
        id="__BEYOND__DATA__"
        dangerouslySetInnerHTML={{
          __html: `
          window.__BEYOND__DATA__=${JSON.stringify(routerProps)}
        `,
        }}
      ></script>
      {extractor.getScriptElements() ?? mainScripts}
    </>
  );
};

export const Main = () => {
  const { html } = useHtmlContext();
  return <div id="__beyond" dangerouslySetInnerHTML={{ __html: html }} />;
};

export const Body = ({ children }: { children: ReactNode }) => {
  return <body>{children}</body>;
};
