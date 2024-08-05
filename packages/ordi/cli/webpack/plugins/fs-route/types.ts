export interface FsRoute {
  path: string;
  route: string;
}

export interface Route {
  /**
   * name or identifier of current route
   */
  name: string;
  /**
   * <Route path />
   */
  path: string;
  /**
   * import specifier of <Route component />
   */
  component?: string;
  /**
   * child routes
   * @default []
   */
  children?: Route[];
  rawRoute?: string;
}

export type ReactRouterRoute = ReactRouterRouteV5;

export interface ReactRouterRouteV5 extends Omit<Route, "name" | "children"> {
  /**
   * <Route exact />
   * @default false
   */
  exact?: boolean;
  /**
   * v5 child routes
   * @default []
   */
  routes?: ReactRouterRouteV5[];
}
