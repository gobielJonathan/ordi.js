import createScriptTag, { mainBundles } from "./scripts";

const mainScripts = mainBundles.map((src) => createScriptTag({ src })).join("");

export function getHeaders({ helmet = {}, extractor }) {
  return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     ${helmet?.title?.toString() ?? ""}
    ${helmet?.meta?.toString() ?? ""}
    ${helmet?.link?.toString() ?? ""}
    ${helmet?.script?.toString() ?? ""}
    ${extractor?.getLinkTags()}
    ${extractor?.getStyleTags()}
</head>
<body>
    <noscript>Please enable your javascript</noscript>
    <div id="__beyond">
    `;
}

export function getFooter({ extractor, initialData = {} }) {
  return `
        </div>
</body>
${extractor?.getScriptTags() ?? mainScripts}
<script id="__BEYOND__DATA__">window.__BEYOND__DATA__=${JSON.stringify(
    initialData
  )}</script>
</html>
    `;
}
