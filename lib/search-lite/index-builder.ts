import type { LexicalSearchDocument, LexicalSearchIndex } from './types';
import { countTokens, mergeTokenCounts, tokenizeText } from './tokenizer';

const TITLE_WEIGHT = 3;
const TAG_WEIGHT = 2;
const BODY_WEIGHT = 1;

function buildDocumentTokenCounts(document: LexicalSearchDocument): Map<string, number> {
  return mergeTokenCounts(
    countTokens(document.title, TITLE_WEIGHT),
    countTokens(document.tags.join(' '), TAG_WEIGHT),
    countTokens(document.content, BODY_WEIGHT)
  );
}

export function buildLexicalSearchIndex(documents: LexicalSearchDocument[]): LexicalSearchIndex {
  const postings = new Map<string, Array<[string, number]>>();
  const docLengths: Record<string, number> = {};
  const indexedDocuments: Record<string, LexicalSearchDocument> = {};

  for (const document of documents) {
    const tokenCounts = buildDocumentTokenCounts(document);
    const tokenTotal = tokenizeText(document.content).length;
    docLengths[document.id] = Math.max(1, tokenTotal);
    indexedDocuments[document.id] = document;

    for (const [token, count] of tokenCounts) {
      const termPostings = postings.get(token) ?? [];
      termPostings.push([document.id, Number(count.toFixed(3))]);
      postings.set(token, termPostings);
    }
  }

  const compactPostings: LexicalSearchIndex['postings'] = {};
  for (const [token, termPostings] of [...postings.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    compactPostings[token] = termPostings.sort(([a], [b]) => a.localeCompare(b));
  }

  const docCount = documents.length;
  const totalDocLength = Object.values(docLengths).reduce((sum, length) => sum + length, 0);

  return {
    version: 1,
    documents: indexedDocuments,
    postings: compactPostings,
    docLengths,
    avgDocLength: docCount > 0 ? totalDocLength / docCount : 1,
    docCount,
    generatedAt: new Date().toISOString(),
  };
}
