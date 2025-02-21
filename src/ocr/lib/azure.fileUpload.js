const { BlobServiceClient } = require("@azure/storage-blob");
const { v4: uuidv4 } = require("uuid");

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_BLOB_CONNECTION_STRING;
const CONTAINER_NAME = process.env.AZURE_BLOB_CONTAINER_NAME;

module.exports = async (file) => {
  try {
    const { buffer, originalname, mimetype } = file;
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

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
