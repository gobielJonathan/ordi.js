import type { AppComponentType } from "../../shared/model/core";
import type { Route } from "../../shared/model/route";
import { matchPath, match } from "react-router";
import { removeURLParameter } from "../utils/url";

export const findRoute = (
  routes: Route[],
  url = ""
): { matches: match | null; component: AppComponentType | null } => {
  let cleanURL = removeURLParameter(url);
  let matches = null;
  let component = null;

  for (const route of routes) {
    if (route.type === "nested-route") {
      return findRoute(route.children, url + route.path);
    }

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
