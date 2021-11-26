import ReactDOM from "react-dom";
import App from "./app";
import "./index.css";
import { canUseDom } from "./utils/dom";
const app = <App />;

const renderer = canUseDom() ? ReactDOM.render : ReactDOM.hydrate;

renderer(app, document.getElementById("__beyond"));
