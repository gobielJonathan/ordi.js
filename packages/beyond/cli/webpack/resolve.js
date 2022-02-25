const { default: resolveCwd } = require("../../src/utils/resolve");

const RESOLVER = {
  "@BUILD_ROUTE": resolveCwd("client/routes/index.ts"),
  "@BUILD_404": resolveCwd("client/error/_404.tsx"),
  "@BUILD_500": resolveCwd("client/error/_500.tsx"),
  "@DOCUMENT": resolveCwd("client/_document.tsx"),
  "@APP": resolveCwd("client/_app.tsx"),
};

module.exports.resolver = RESOLVER;
