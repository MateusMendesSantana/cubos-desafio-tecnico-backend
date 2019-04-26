import express from "express";
import bodyParser from 'body-parser';
import { router } from "./routes/schedule-routes";

const server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(router);

server.get("/", (_, res) => {
  res.send("✌(ツ)");
});

export default server;