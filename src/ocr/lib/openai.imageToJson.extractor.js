import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = process.env.OPENAI_API_URL;

export default async (fileUrl) => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Extract structured JSON from the given document.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract text from this document and structure it as JSON.",
              },
              {
                type: "image_url",
                image_url: { url: fileUrl },
              },
            ],
          },
        ],
        max_tokens: 1500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    const jsonString = response.data.choices[0].message.content.trim();
    return JSON.parse(jsonString.replace(/^```json\n|```$/g, ""));
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};
