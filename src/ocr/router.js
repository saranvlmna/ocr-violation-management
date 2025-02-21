const ocrRouter = require("express").Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const ocrExtract = require("./ocr.extract");

ocrRouter.post("/", upload.single("file"), ocrExtract);

module.exports = ocrRouter;
