import getDatabase from "../../../database/cosmos.connection.js";

export default async (data) => {
  try {
    const { tollId, url, type, status } = data;

    const database = await getDatabase();
    const container = database.container("fileData");

    return container.items.create({ tollId, url, type, status });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
