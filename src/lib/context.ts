import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  try {
    const client = new Pinecone({
      environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY,
    });
    // index
    const pineconeIndex = await client.index("chatpdf");
  
    const queryResult = await pineconeIndex.query({
      topK: 5, 
      vector: embeddings,
      includeMetadata: true,
    });

    return queryResult.matches || [];

  } catch (error) {
    console.error("error querying embeddings", error);
    throw error;
  }
}

export async function getContext(query: string, fileKey: string) {

  const queryEmbeddings = await getEmbeddings(query);

  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

  const qualifyingDocs = matches.filter(
    (match: any) => match.score && match.score > 0.7
  );

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  let docs = qualifyingDocs.map((match: any) => (match.metadata as Metadata).text);
  // 5 vectors
  return docs.join("\n").substring(0, 3000);
}