import "dotenv/config";
import express, { json } from "express";
import ocrRouter from "./src/ocr/router.js";
import cosmosConnection from "./database/cosmos.connection.js";

const app = express();
const port = process.env.APP_PORT || 4579;
await cosmosConnection()

app.use(json());
app.use("/ocr", ocrRouter);

app.listen(port, () => {
  console.log(`ocr violation management server listening at ${port}`);
});
