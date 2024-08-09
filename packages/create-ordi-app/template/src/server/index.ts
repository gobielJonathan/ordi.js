import App from "./app";
import { error, info } from "ordijs/log";

let app = App;

app
  .start()
  .then(() => {
    info(`Listening: ${process.env.HOST_NAME}:${process.env.PORT_SERVER}`);
  })
  .catch((err) => {
    error(err);
  });

if (module.hot) {
  module.hot.accept(["./app"], async () => {
    await app.close();
    app = require("./app").default;
    app.start();
  });
}
