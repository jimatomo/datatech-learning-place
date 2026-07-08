export interface LexicalSearchDocument {
  id: string;
  type: 'quiz' | 'text';
  title: string;
  content: string;
  tags: string[];
  author: string;
  url: string;
  createdAt: string;
  length: number;
}

export type Posting = [documentId: string, weightedFrequency: number];

export interface LexicalSearchIndex {
  version: 1;
  documents: Record<string, LexicalSearchDocument>;
  postings: Record<string, Posting[]>;
  docLengths: Record<string, number>;
  avgDocLength: number;
  docCount: number;
  generatedAt: string;
}

export interface SearchResult extends LexicalSearchDocument {
  score: number;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
}

export interface SearchOptions {
  type?: 'hybrid' | 'fulltext' | 'vector';
  limit?: number;
  contentType?: 'quiz' | 'text' | 'all';
  tags?: string[];
  minScore?: number;
}
