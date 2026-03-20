import { env } from "./config/env";
import express from "express";
import { router } from "./routes";

const port = Number(env.SERVER_PORT!);
const app = express();

app.use(router);

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`)
});
