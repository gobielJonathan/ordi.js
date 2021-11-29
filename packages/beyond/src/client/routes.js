import Home from "@beyond/page/home/lazy";
import Person from "@beyond/page/person/lazy";

export default [
  {
    component: Home,
    path: "/",
    exact: true,
  },
  {
    component: Person,
    path: "/person",
    exact: true,
  },
];
