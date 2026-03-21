import { env } from "./config/env";
import express from "express";
import { router } from "./routes";
import path from "path";

const port = Number(env.SERVER_PORT!);
const app = express();

app.use(express.json());
app.use(router);
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`)
});
