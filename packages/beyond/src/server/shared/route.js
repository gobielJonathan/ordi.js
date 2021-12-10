import { matchPath } from "react-router";
import { removeURLParameter } from "../utils/url";
import routes from "@beyond/client/routes";

export const findRoute = (url = "") => {
  let cleanURL = removeURLParameter(url);
  let matches = undefined;
  let component = undefined;

  for (const route of routes) {
    if (matchPath(cleanURL, { path: route.path, exact: true })) {
      matches = matchPath(cleanURL, { path: route.path, exact: true });
      component = route.component;
      break;
    }
  }

  return {
    matches,
    component,
  };
};
