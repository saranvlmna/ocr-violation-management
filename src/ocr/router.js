const ocrRouter = require("express").Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // No folder needed
const ocrExtract = require("./ocr.extract");

ocrRouter.post("/", upload.single("file"), ocrExtract);

module.exports = ocrRouter;
