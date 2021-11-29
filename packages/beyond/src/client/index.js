import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./app";
import "./index.css";
import { canUseDom } from "./utils/dom";

const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

const renderer = canUseDom() ? ReactDOM.render : ReactDOM.hydrate;

renderer(app, document.getElementById("__beyond"));
