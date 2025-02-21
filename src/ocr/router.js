const ocrExtract = require("./ocr.extract");
const ocrRouter = require("express").Router();

ocrRouter.post("/", ocrExtract)
module.exports = ocrRouter;
