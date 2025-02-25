import getDatabase from "../../../database/cosmos.connection.js";

export default async (data) => {
  try {
    const { tollName, status } = data;

    const database = await getDatabase();
    const container = database.container("tollDetailes");

    return container.items.create({ tollName, status });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
