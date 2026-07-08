import { tokenizeText } from '../search-lite/tokenizer';

export {
  tokenizeText,
  normalizeSearchText,
} from '../search-lite/tokenizer';

export async function tokenize(text: string): Promise<string[]> {
  return tokenizeText(text);
}

export async function extractUniqueTokens(text: string): Promise<string[]> {
  return [...new Set(tokenizeText(text))];
}

export async function getTokenizer() {
  return null;
}

export function createOramaTokenizer() {
  return {
    tokenize: tokenizeText,
    language: 'japanese',
  };
}
