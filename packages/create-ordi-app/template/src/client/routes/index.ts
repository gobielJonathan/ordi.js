import { RouteEntry } from "ordijs/route";

import Home from "./home";

const ROUTES: RouteEntry[] = [
  {
    type: "route",
    component: Home,
    name: "home",
    path: "/",
    exact: true,
    strict: false,
  },
];

export default ROUTES;
