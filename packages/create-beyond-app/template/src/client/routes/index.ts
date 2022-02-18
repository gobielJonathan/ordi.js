import { RouteEntry } from "beyond/route";

import Person from "./Person";

const ROUTES: RouteEntry[] = [
  {
    type: "route",
    component: Person,
    name: "person",
    path: "/person",
    exact: true,
    strict: false,
  },
];

export default ROUTES;
