import express from "express";
import { router } from "./routes/schedule-routes";

const server = express();

server.use(router);

server.get("/", (_, res) => {
  res.send("✌(ツ)");
});

export default server;