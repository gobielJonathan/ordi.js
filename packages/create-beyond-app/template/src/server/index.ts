import App from "./app";
import { error, info } from "beyond/log";

let app = App

app
  .start()
  .then(() => {
    info("Listening: 127.0.0.1:" + process.env.PORT_SERVER);
  })
  .catch((err) => {
    error(err);
  });

if (module.hot) {
  module.hot.accept(["./app", "../client/routes"], async () => {
    await app.close();
    app = require("./app").default;
    app.start();
  });
}
