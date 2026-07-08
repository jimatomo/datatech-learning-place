import fs from 'fs';
import path from 'path';
import type { LexicalSearchIndex, SearchOptions, SearchResponse, SearchResult } from './types';
import { tokenizeText } from './tokenizer';

const INDEX_FILE_NAME = 'lexical-search-index.json';
const BM25_K1 = 1.2;
const BM25_B = 0.75;

let indexInstance: LexicalSearchIndex | null = null;

function emptyIndex(): LexicalSearchIndex {
  return {
    version: 1,
    documents: {},
    postings: {},
    docLengths: {},
    avgDocLength: 1,
    docCount: 0,
    generatedAt: '',
  };
}

function getIndexPathCandidates(): string[] {
  return [
    path.join(process.cwd(), 'data', INDEX_FILE_NAME),
    path.join(process.cwd(), 'apps', 'web', 'data', INDEX_FILE_NAME),
    path.join(process.cwd(), '..', 'data', INDEX_FILE_NAME),
  ];
}

export function getLexicalSearchIndex(): LexicalSearchIndex {
  if (indexInstance) {
    return indexInstance;
  }

  const indexPath = getIndexPathCandidates().find((candidate) => fs.existsSync(candidate));
  if (!indexPath) {
    console.warn(`Lexical search index not found: ${INDEX_FILE_NAME}`);
    indexInstance = emptyIndex();
    return indexInstance;
  }

  indexInstance = JSON.parse(fs.readFileSync(indexPath, 'utf-8')) as LexicalSearchIndex;
  return indexInstance;
}

function hasAllTags(documentTags: string[], requiredTags?: string[]): boolean {
  if (!requiredTags || requiredTags.length === 0) {
    return true;
  }

  return requiredTags.every((tag) => documentTags.includes(tag));
}

function normalizeScores(results: SearchResult[], minScore?: number): SearchResult[] {
  if (results.length === 0) {
    return results;
  }

  const maxScore = Math.max(...results.map((result) => result.score)) || 1;
  const normalized = results.map((result) => ({
    ...result,
    score: result.score / maxScore,
  }));

  return minScore === undefined
    ? normalized
    : normalized.filter((result) => result.score >= minScore);
}

export async function search(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResponse> {
  const { limit = 20, contentType = 'all', tags, minScore } = options;
  const index = getLexicalSearchIndex();
  const queryTokens = [...new Set(tokenizeText(query))];
  const candidateScores = new Map<string, number>();

  for (const token of queryTokens) {
    const postings = index.postings[token];
    if (!postings || postings.length === 0) {
      continue;
    }

    const idf = Math.log(1 + (index.docCount - postings.length + 0.5) / (postings.length + 0.5));

    for (const [documentId, termFrequency] of postings) {
      const document = index.documents[documentId];
      if (!document) {
        continue;
      }

      if (contentType !== 'all' && document.type !== contentType) {
        continue;
      }

      if (!hasAllTags(document.tags, tags)) {
        continue;
      }

      const docLength = index.docLengths[documentId] ?? document.length ?? index.avgDocLength;
      const denominator = termFrequency + BM25_K1 * (1 - BM25_B + BM25_B * (docLength / index.avgDocLength));
      const score = idf * ((termFrequency * (BM25_K1 + 1)) / denominator);
      candidateScores.set(documentId, (candidateScores.get(documentId) ?? 0) + score);
    }
  }

  const scoredResults = [...candidateScores.entries()]
    .map(([documentId, score]) => ({
      ...index.documents[documentId],
      score,
    }))
    .filter((result): result is SearchResult => Boolean(result.id))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.createdAt.localeCompare(a.createdAt);
    });

  const filteredResults = normalizeScores(scoredResults, minScore);

  return {
    results: filteredResults.slice(0, limit),
    total: filteredResults.length,
  };
}

export async function hybridSearch(query: string, options: SearchOptions = {}): Promise<SearchResponse> {
  return search(query, options);
}

export async function vectorSearch(query: string, options: SearchOptions = {}): Promise<SearchResponse> {
  return search(query, options);
}

export type { SearchOptions, SearchResponse, SearchResult } from './types';
