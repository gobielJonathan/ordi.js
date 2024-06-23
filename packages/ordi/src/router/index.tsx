import { Switch, Route } from "react-router-dom";
import type { VFC } from "react";

import _404 from "@BUILD_404";
import ROUTES from "@BUILD_ROUTE";

import type { Route as OrdiRoute } from "../shared/model/route";

const CreateRoute: VFC<OrdiRoute> = (props) => {

  switch (props.type) {
    case "route":
      const { component: Component } = props;
      return (
        <Route
          key={props.path}
          exact={props.exact}
          render={() => <Component key={props.path} />}
          path={props.path}
        />
      );

    default:
      return <></>;
  }
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
