const { default: resolveCwd } = require("../../src/utils/resolve");

const RESOLVER = {
  "@BUILD_ROUTE": resolveCwd("routes/index.ts"),
  "@BUILD_404": resolveCwd("client/default/error/_400.tsx"),
  "@BUILD_500": resolveCwd("client/default/error/_500.tsx"),
};

module.exports.resolver = RESOLVER;
