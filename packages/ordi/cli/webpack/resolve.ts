import resolveCwd from "../../utils/resolve";

const resolver = {
  "@BUILD_404": resolveCwd("src/client/error/_404.tsx"),
  "@BUILD_500": resolveCwd("src/client/error/_500.tsx"),
  "@DOCUMENT": resolveCwd("src/client/_document.tsx"),
  "@APP": resolveCwd("src/client/_app.tsx"),
};

export default resolver;
