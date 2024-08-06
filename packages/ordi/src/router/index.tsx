import { Switch, Route } from "react-router-dom";
import type { VFC } from "react";

import _404 from "@BUILD_404";
import ROUTES, { type Route as OrdiRoute } from "@BUILD_ROUTE";

console.log({ ROUTES });
const CreateRoute: VFC<OrdiRoute> = (props) => {
  const { component: Component } = props;
  console.log({ props });
  console.log("router component ", <Component key={props.path} />);
  return (
    <Route
      key={props.path}
      exact={props.exact}
      render={() => <Component key={props.path} />}
      path={props.path}
    />
  );
};

export default function Routes() {
  return (
    <Switch>
      {ROUTES.map((route, key) => (
        <CreateRoute key={key} {...route} />
      ))}
      <Route component={_404} path="*" />
    </Switch>
  );
}
