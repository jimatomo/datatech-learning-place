const ASCII_WORD_RE = /[\p{Script=Latin}\p{Number}][\p{Script=Latin}\p{Number}_+.#-]*/gu;
const JAPANESE_RUN_RE = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー]+/gu;

export function normalizeSearchText(text: string): string {
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenizeText(text: string): string[] {
  const normalized = normalizeSearchText(text);
  if (!normalized) {
    return [];
  }

  const tokens: string[] = [];

  for (const match of normalized.matchAll(ASCII_WORD_RE)) {
    const token = match[0].replace(/^[._+#-]+|[._+#-]+$/g, '');
    if (token.length > 0) {
      tokens.push(token);
    }
  }

  for (const match of normalized.matchAll(JAPANESE_RUN_RE)) {
    const run = match[0];
    if (run.length === 1) {
      tokens.push(run);
      continue;
    }

    for (const size of [2, 3]) {
      if (run.length < size) {
        continue;
      }
      for (let i = 0; i <= run.length - size; i += 1) {
        tokens.push(run.slice(i, i + size));
      }
    }
  }

  return tokens;
}

export function countTokens(text: string, weight = 1): Map<string, number> {
  const counts = new Map<string, number>();
  for (const token of tokenizeText(text)) {
    counts.set(token, (counts.get(token) ?? 0) + weight);
  }
  return counts;
}

export function mergeTokenCounts(...counts: Map<string, number>[]): Map<string, number> {
  const merged = new Map<string, number>();
  for (const countMap of counts) {
    for (const [token, count] of countMap) {
      merged.set(token, (merged.get(token) ?? 0) + count);
    }
  }
  return merged;
}
