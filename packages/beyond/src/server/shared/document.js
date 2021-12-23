import { useHtmlContext } from "@beyond/shared/context/html";
import { useDataContext } from "@beyond/shared/context/data";

const mainBundles = ["main", "runtime", "vendors~main"];

function createScriptTag({ src, type = "", nomodule = false, nonce = "" }) {
  if (src) {
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
  return "";
}

const mainScripts = mainBundles.map((src) => createScriptTag({ src })).join("");

export const Html = ({ children }) => {
  return <html lang={"en"}>{children}</html>;
};

export const Head = () => {
  const { helmet, extractor } = useHtmlContext();

  return (
    <head>
      {helmet.title?.toString()}
      {helmet.priority?.toString()}
      {helmet.meta?.toString()}
      {helmet.link?.toString()}
      {helmet.script?.toString()}
      {extractor?.getLinkElements()}
      {extractor?.getStyleElements()}
    </head>
  );
};

export const Scripts = () => {
  const { extractor } = useHtmlContext();
  const data = useDataContext();
  return (
    <>
      <script id="__BEYOND__DATA__" type="application/json">
        {JSON.stringify(data)}
      </script>
      {extractor?.getScriptElements() ?? mainScripts}
    </>
  );
};

export const Main = () => {
  const { html } = useHtmlContext();
  console.log({ html });
  return <div id="__beyond" dangerouslySetInnerHTML={{ __html: html }} />;
};
export const Document = () => {
  return (
    <Html>
      <Head />
      <body>
        <noscript>Please enable your javascript</noscript>
        <Main />
        <Scripts />
      </body>
    </Html>
  );
};
