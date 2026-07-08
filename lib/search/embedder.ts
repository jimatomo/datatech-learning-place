export async function getEmbeddingPipeline(): Promise<null> {
  return null;
}

export async function generateEmbedding(): Promise<number[]> {
  return [];
}

export async function generateQueryEmbedding(): Promise<number[]> {
  return [];
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  return texts.map(() => []);
}

export function getEmbeddingDimension(): number {
  return 0;
}
