import createScriptTag, { mainBundles } from "./scripts";

export function getHeaders({ helmet = {} }) {
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
</head>
<body>
    <noscript>Please enable your javascript</noscript>
    <div id="__beyond">
    `;
}

export function getFooter() {
  const scripts = mainBundles.map((src) => createScriptTag({ src })).join("");
  return `
        </div>
</body>
${scripts}
</html>
    `;
}
