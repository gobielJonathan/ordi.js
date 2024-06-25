import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";

import Routes from "../router";
import ContextProvider from "../shared/context";
import App from "./_app";

const app = (
  <BrowserRouter>
    <ContextProvider>
      <App>
        <Routes />
      </App>
    </ContextProvider>
  </BrowserRouter>
);

const renderer = (id: HTMLElement | null) => loadableReady(() => ReactDOM.hydrate(app, id))

renderer(document.getElementById("__ordi"));
