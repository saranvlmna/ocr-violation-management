import getDatabase from "../../../database/cosmos.connection.js";

export default async (data) => {
  try {
    const { tollId, url, type, status } = data;

    const database = await getDatabase();
    const container = database.container({ tollId, url, type, status });

    return container.items.create(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
