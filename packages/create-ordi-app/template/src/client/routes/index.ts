import { RouteEntry } from "ordijs/route";

import Person from "./home";

const ROUTES: RouteEntry[] = [
  {
    type: "route",
    component: Person,
    name: "home",
    path: "/",
    exact: true,
    strict: false,
  },
];

export default ROUTES;
