import "dotenv/config";
import { CosmosClient } from "@azure/cosmos";
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE;
const containerId = process.env.COSMOS_DB_CONTAINER;

const client = new CosmosClient({ endpoint, key });

async function getDatabase() {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  console.log(`Connected to database: ${database.id}`);
  return database;
}

async function getContainer() {
  const database = await getDatabase();
  const { container } = await database.containers.createIfNotExists({ id: containerId });
  console.log(`Connected to container: ${container.id}`);
  return container;
}

export default { client, getDatabase, getContainer };
