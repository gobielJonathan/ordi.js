declare module "@BUILD_ROUTE" {
  export type Route = {
    name: string;
    path: string;
    component: any;
    exact?: boolean;
    strict?: boolean;
  };

  declare const routes: Route[];

  export default routes;
}
