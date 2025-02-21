const express = require("express");
require("dotenv").config();
const azureRouter = require("./src/router");
const app = express();
const port = 4579;

app.use(express.json());
app.use("/azure", azureRouter);

app.listen(port, () => {
  console.log(`ocr violation management server listening at ${port}`);
});
