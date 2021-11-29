import { Switch, Route } from "react-router-dom";
import { _404 } from "@beyond/component/error";
import routes from "@beyond/client/routes";
import { Redirect } from "react-router-dom";
import { canUseDom } from "@beyond/client/utils/dom";

export default (props) => {
  //TODO: will be remove to HOC component app
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
      <Redirect from="/fb" to="/ab" />
      <Route component={_404} path="*" />
    </Switch>
  );
};
