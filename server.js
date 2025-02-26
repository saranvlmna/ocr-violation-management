import "dotenv/config";
import express, { json } from "express";
import cosmosConnection from "./database/cosmos.connection.js";
import ocrRouter from "./src/ocr/router.js";
import violationRouter from "./src/violation/router.js";

const app = express();
const port = process.env.APP_PORT || 4579;
await cosmosConnection();

app.use(json());

app.use("/ocr", ocrRouter);
app.use("/violation", violationRouter);

app.listen(port, () => {
  console.log(`ocr violation management server listening at ${port}`);
});
