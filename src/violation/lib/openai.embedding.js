import axios from "axios";

const OPENAI_EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL;
const OPENAI_API_URL = process.env.OPENAI_API_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async (text) => {
  try {
    const response = await axios.post(
      `${OPENAI_API_URL}/embeddings`,
      { input: text, model: OPENAI_EMBEDDING_MODEL },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data[0].embedding;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
