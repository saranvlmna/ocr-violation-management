import getDatabase from "../../../database/cosmos.connection.js";
import createFileDetails from "./file.create.js";
import findFileDetails from "./file.findOne.js";
import createToll from "./toll.create.js";
import findTollDetails from "./toll.findOne.js";

export default async (jsonData, fileUrl, mimeType) => {
  try {
    const { authority_name, invoice_number } = jsonData;

    let isTollExist = await findTollDetails(authority_name);
    if (!isTollExist) isTollExist = await createToll({ tollName: authority_name });

    let isFileExist = await findFileDetails(isTollExist.insertedId || isTollExist._id, invoice_number);
    if (isFileExist) return;

    isFileExist = await createFileDetails(isTollExist.insertedId || isTollExist._id, invoice_number, fileUrl, mimeType);

    if (isTollExist && isFileExist) {
      const database = await getDatabase();
      const collection = database.collection("violationDetails");

      return await collection.insertOne(jsonData);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
