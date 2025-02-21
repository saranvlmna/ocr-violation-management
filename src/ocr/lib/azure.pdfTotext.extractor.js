import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { promisify } from "util";
const sleep = promisify(setTimeout);

const AZURE_VISION_KEY = process.env.AZURE_VISION_KEY || "";
const AZURE_VISION_ENDPOINT = process.env.AZURE_VISION_ENDPOINT || "";

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": AZURE_VISION_KEY } }),
  AZURE_VISION_ENDPOINT
);

export default async (fileUrl) => {
  try {
    const result = await computerVisionClient.read(fileUrl);
    const operationLocation = result.operationLocation;
    if (!operationLocation) throw new Error("No operation location found in response.");

    let operationId = operationLocation.split("/").pop();

    while (true) {
      await sleep(1000);
      let response = await computerVisionClient.getReadResult(operationId);
      if (response.status === "succeeded") return formatOcrResults(response.analyzeResult.readResults);
      if (response.status === "failed") throw new Error("Text recognition failed.");
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const formatOcrResults = (readResults) => {
  return readResults
    .flatMap((result) => result.lines.map((line) => line.words.map((w) => w.text).join(" ")))
    .join("\n");
};
