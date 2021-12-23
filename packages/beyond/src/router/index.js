import { Switch, Route } from "react-router-dom";
import { _404 } from "@beyond/default/error";
import routes from "@beyond/default/routes";
import { useDataContext } from "@beyond/shared/context/data/index";

export default function Routes() {
  const initialData = useDataContext();
  return (
    <Switch>
      {routes.map(({ exact, path, component: Component }, key) => (
        <Route
          key={key}
          exact={exact}
          render={() => <Component {...initialData} />}
          path={path}
        />
      ))}
      <Route component={_404} path="*" />
    </Switch>
  );
}
