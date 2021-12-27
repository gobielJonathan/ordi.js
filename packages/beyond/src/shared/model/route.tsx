import type { AppComponentType } from "./core";

type PlainRoute = {
  type: "route";
  component: AppComponentType;
  exact?: boolean;
  strict?: boolean;
};

type NestedRoute = {
  type: "nested-route";
  children: Route[];
};

export type Route = { name: string; path: string } & (PlainRoute | NestedRoute);
