import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";

const AZURE_BLOB_CONNECTION_STRING = process.env.AZURE_BLOB_CONNECTION_STRING;
const AZURE_BLOB_CONTAINER_NAME = process.env.AZURE_BLOB_CONTAINER_NAME;

export default async (file) => {
  try {
    const { buffer, originalname, mimetype } = file;
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_BLOB_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(AZURE_BLOB_CONTAINER_NAME);

    await containerClient.createIfNotExists({ access: "container" });

    const blobName = `${uuidv4()}-${originalname}`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: mimetype },
    });

    return blockBlobClient?.url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
