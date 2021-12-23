import { Switch, Route } from "react-router-dom";
import { _404 } from "@beyond/default/error";
import routes from "@beyond/default/routes";
import { canUseDom } from "@beyond/utils/dom";

export default function Routes(props) {
  // TODO: will be remove to HOC component app
  const initialData = canUseDom() ? window.__BEYOND__DATA__ : props;

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
