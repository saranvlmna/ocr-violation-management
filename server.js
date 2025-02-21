const express = require("express");
require("dotenv").config();
const ocrRouter = require("./src/ocr/router");

const app = express();
const port = process.env.APP_PORT || 4579;

app.use(express.json());
app.use("/azure", ocrRouter);

app.listen(port, () => {
  console.log(`ocr violation management server listening at ${port}`);
});
