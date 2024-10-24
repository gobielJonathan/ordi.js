import app from "./app";
import { error, info } from "ordijs/log";

app
  .start()
  .then(() => {
    info(`Listening: ${process.env.HOST_NAME}:${process.env.PORT_SERVER}`);
  })
  .catch((err) => {
    error(err);
  });
