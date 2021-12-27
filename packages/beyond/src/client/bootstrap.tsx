import ReactDOM from "react-dom";
import Routes from "@beyond/router";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import { canUseDom } from "../utils/dom";
import ContextProvider from "@beyond/shared/context";
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

const renderer = (id: HTMLElement | null) =>
  canUseDom()
    ? ReactDOM.render(app, id)
    : loadableReady(() => ReactDOM.hydrate(app, id));

renderer(document.getElementById("__beyond"));
