import { CosmosClient } from "@azure/cosmos";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const uri = process.env.COSMOS_DB_ENDPOINT;
const databaseId = process.env.COSMOS_DB_DATABASE;

export default async () => {
  try {
    const credential = new DefaultAzureCredential();

    const client = new CosmosClient({
      endpoint: uri,
      aadCredentials: credential,
    });

    const database = client.database(databaseId);
    console.log("Connected to Cosmos DB");
    return database;
  } catch (error) {
    console.error("Failed to connect to Cosmos DB:", error.message);
    throw error;
  }
};
