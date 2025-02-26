import { Pinecone } from "@pinecone-database/pinecone";
import { v4 as uuidv4 } from "uuid";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX = process.env.PINECONE_INDEX;

export default async (embedd, metadata) => {
  try {
    const pc = new Pinecone({
      apiKey: PINECONE_API_KEY,
    });

    const index = pc.index(PINECONE_INDEX);

    return await index.namespace("ns1").upsert([
      {
        id: uuidv4(),
        values: embedd,
        metadata: { data: JSON.stringify(metadata) },
      },
    ]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
