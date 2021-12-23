import ReactDOM from "react-dom";
import Routes from "@beyond/router/index";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import { canUseDom } from "../utils/dom";
import ContextProvider from "@beyond/shared/context/index";
import App from "@beyond/default/_app";

const app = (
  <BrowserRouter>
    <ContextProvider>
      <App>
        <Routes />
      </App>
    </ContextProvider>
  </BrowserRouter>
);

const renderer = (id) =>
  canUseDom()
    ? ReactDOM.render(app, id)
    : loadableReady(() => ReactDOM.hydrate(app, id));

renderer(document.getElementById("__beyond"));
