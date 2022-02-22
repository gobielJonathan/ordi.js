import { RouteEntry } from "beyond/route";

import Person from "./Person";
import Food from "./Food";

const ROUTES: RouteEntry[] = [
  {
    type: "route",
    component: Person,
    name: "person",
    path: "/person",
    exact: true,
    strict: false,
  },
  {
    type: "route",
    component: Food,
    name: "food",
    path: "/food",
    exact: true,
    strict: false,
  },
];

export default ROUTES;
