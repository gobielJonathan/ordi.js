import { Switch, Route } from "react-router-dom";
import { _404 } from "@beyond/default/error";
import routes from "@beyond/default/routes";
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
          render={() => <Component {...initialData} />}
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
      {routes.map((route, key) => (
        <CreateRoute key={key} {...route} />
      ))}
      <Route component={_404} path="*" />
    </Switch>
  );
}
