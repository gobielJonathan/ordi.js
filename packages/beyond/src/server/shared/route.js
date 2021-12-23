import { matchPath } from "react-router";
import { removeURLParameter } from "../utils/url";
import routes from "@beyond/default/routes";

export const findRoute = (url = "") => {
  let cleanURL = removeURLParameter(url);
  let matches;
  let component;

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
