import Server from "beyond/server";

const app = Server();
app.start().catch((err) => {
  console.error(err);
});
