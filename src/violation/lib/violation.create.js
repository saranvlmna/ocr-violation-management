import getDatabase from "../../../database/cosmos.connection.js";

export default async (data) => {
  try {
    const database = await getDatabase();
    const container = database.container("violationDetails");
    return container.items.create(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
