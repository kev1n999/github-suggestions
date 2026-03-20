import { env } from "./config/env";
import express from "express";

const port = Number(env.SERVER_PORT!);
const app = express();

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`)
});
