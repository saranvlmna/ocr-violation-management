import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = process.env.OPENAI_API_URL;
const OPENAI_OCR_MODEL = process.env.OPENAI_OCR_MODEL;

export default async (text) => {
  try {
    if (!text) throw new Error("No text found.");

    const response = await axios.post(
      `${OPENAI_API_URL}/chat/completions`,
      {
        model: OPENAI_OCR_MODEL,
        messages: [
          {
            role: "system",
            content:
              "Extract structured JSON from the given document, ensuring that all details are preserved without wrapping them inside any extra key. The 'authority_name' and 'invoice_number' should be a separate key-value pair at the top level, followed by all relevant invoice details in a well-structured format.",
          },
          { role: "user", content: text },
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

    return JSON.parse(response.data.choices[0].message.content.trim().replace(/^```json\n|```$/g, ""));
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
};
