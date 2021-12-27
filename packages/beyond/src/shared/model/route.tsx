import type { AppComponent } from "./client";

type PlainRoute = {
  type: "route";
  component: AppComponent;
  exact?: boolean;
  strict?: boolean;
};

type NestedRoute = {
  type: "nested-route";
  children: Route[];
};

export type Route = { name: string; path: string } & (PlainRoute | NestedRoute);
