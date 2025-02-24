import azureFileUpload from "./lib/azure.fileUpload.js";
import azurePdfTotextExtractor from "./lib/azure.pdfTotext.extractor.js";
import ocrExtractCreate from "./lib/ocr.extract.create.js";
import openaiImageToJsonExtractor from "./lib/openai.imageToJson.extractor.js";
import openaiTextToJsonExtractor from "./lib/openai.textToJson.extractor.js";

export default async (req, res) => {
  try {
    const { mimetype } = req.file;
    let jsonData = {};

    const fileUrl = await azureFileUpload(req.file);

    if (mimetype == "image/jpeg" || mimetype == "image/png") jsonData = await openaiImageToJsonExtractor(fileUrl);
    if (mimetype == "application/pdf") {
      const pdfText = await azurePdfTotextExtractor(fileUrl);
      if (pdfText) jsonData = await openaiTextToJsonExtractor(pdfText);
    }

    const result = await ocrExtractCreate(jsonData);
    console.log(result);

    return res.json({ fileUrl, jsonData });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
