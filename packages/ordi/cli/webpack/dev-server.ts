import type { Configuration } from "webpack";

export default (
  hostname: string,
  port: number
): Configuration["devServer"] => ({
  port: port,
  compress: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers":
      "X-Requested-With, content-type, Authorization",
  },
  client: {
    webSocketURL: {
      hostname: hostname,
      port: port, // The WebSocket port for HMR
    },
  },
});
