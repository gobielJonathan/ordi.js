import net from "node:net";

const PORT_AVAIL = 1;
const PORT_UNAVAIL = -1;

const createServerChecker = (port: number) =>
  new Promise<number>((resolve) => {
    const server = net.createServer();

    server.once("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(PORT_UNAVAIL);
      } else {
        console.error(`Error occurred: ${err.message}`);
      }
    });

    server.once("listening", () => {
      resolve(PORT_AVAIL);
      server.close();
    });

    server.listen(port);
  });

export const checkPort = async (port: number, retry = 1) => {
  let _retry = 1;

  while (true) {
    if (_retry === retry) break;

    const status = await createServerChecker(port);
    if (status === PORT_AVAIL) {
      break;
    }

    port++;
    _retry++;
  }

  return port;
};
