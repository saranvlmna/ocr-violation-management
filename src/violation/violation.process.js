import getDatabase from "../../database/cosmos.connection.js";
import createFileDetails from "./lib/file.create.js";
import findFileDetails from "./lib/file.findOne.js";
import jsonToEmbedding from "./lib/openai.embedding.js";
import createToll from "./lib/toll.create.js";
import findTollDetails from "./lib/toll.findOne.js";
import insetToVectorDb from "./lib/vector.insert.js";

export default async (jsonData, fileUrl, mimeType) => {
  try {
    const { authority_name, invoice_number } = jsonData;

    let isTollExist = await findTollDetails(authority_name);
    if (!isTollExist)
      isTollExist = await createToll({ tollName: authority_name });

    let isFileExist = await findFileDetails(
      isTollExist.insertedId || isTollExist._id,
      invoice_number
    );
    if (isFileExist) return;

    isFileExist = await createFileDetails(
      isTollExist.insertedId || isTollExist._id,
      invoice_number,
      fileUrl,
      mimeType
    );

    if (isTollExist && isFileExist) {
      jsonData["fileUrl"] = fileUrl;
      jsonData["fileDetailsId"] = isTollExist.insertedId || isTollExist._id;
      jsonData["createdAt"] = new Date();
      jsonData["updatedAt"] = new Date();

      const database = await getDatabase();
      const collection = database.collection("violationDetails");
      await collection.insertOne(jsonData);

      const embbedding = await jsonToEmbedding(JSON.stringify(jsonData));
      return await insetToVectorDb(embbedding, jsonData);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
