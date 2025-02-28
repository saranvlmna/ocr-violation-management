import vectorSearch from "./lib/vector.search.js";

export default async (req, res) => {
  try {
    const { key } = req.query;

    const result = await vectorSearch(key);

    return res.json({ result });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
