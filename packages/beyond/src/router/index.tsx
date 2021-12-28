import { Switch, Route } from "react-router-dom";
import _404 from "@BUILD_404";
import ROUTES from "@BUILD_ROUTE";
import { useDataContext } from "@beyond/shared/context/data";
import type { Route as BeyondRoute } from "@beyond/shared/model/route";
import type { VFC } from "react";

const CreateRoute: VFC<BeyondRoute> = (props) => {
  const initialData = useDataContext();

  switch (props.type) {
    case "route":
      const { component: Component } = props;
      return (
        <Route
          key={props.path}
          exact={props.exact}
          render={() => <Component key={props.path} {...initialData} />}
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
