import { AzureKeyCredential, SearchClient } from "@azure/search-documents";

const SEARCH_SERVICE_NAME = "";
const INDEX_NAME = "";
const SEARCH_API_KEY = "";

const searchClient = new SearchClient(
  `https://${SEARCH_SERVICE_NAME}.search.windows.net`,
  INDEX_NAME,
  new AzureKeyCredential(SEARCH_API_KEY)
);

export default async () => {
  try {
    const searchResults = await searchClient.search("laptop");
    for await (const result of searchResults.results) {
      console.log(result);
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};
