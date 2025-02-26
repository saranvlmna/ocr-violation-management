import { Pinecone } from "@pinecone-database/pinecone";
import openaiEmbedding from "./openai.embedding.js";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX = process.env.PINECONE_INDEX;

export default async (keyString) => {
  try {
    const pc = new Pinecone({
      apiKey: PINECONE_API_KEY,
    });

    const index = pc.index(PINECONE_INDEX);

    const result = await index.namespace("ns1").query({
      topK: 2,
      vector: await openaiEmbedding(keyString),
      includeValues: true,
      includeMetadata: true,
    });

    const matches = result?.matches[0];
    return {
      score: matches?.score,
      data: JSON.parse(matches?.metadata?.data),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
