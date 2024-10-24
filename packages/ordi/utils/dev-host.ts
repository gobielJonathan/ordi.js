import { reservePort } from "./port";

export default async function generateDevHost() {
  //check server port, if port used, increment the port
  const portServer = await reservePort(Number(process.env.PORT_SERVER), 3);

  //check client port, if port used, increment the port
  const portClient = await reservePort(Number(portServer + 1), 3);

  return {
    portServer: String(portServer),
    hostServer: `${process.env.HOST_NAME}:${portServer}`,

    portClient: String(portClient),
    hostClient: `${process.env.HOST_NAME}:${portClient}`,
  };
}
