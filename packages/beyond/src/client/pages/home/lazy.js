import loadable from "@loadable/component";

export default loadable(() => import("./index"), {
  fallback: <h1>Loading</h1>,
});
