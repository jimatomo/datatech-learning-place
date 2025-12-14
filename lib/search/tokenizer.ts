import kuromoji from 'kuromoji';
import path from 'path';

// kuromojiのトークナイザーインスタンス（シングルトン）
let tokenizerInstance: kuromoji.Tokenizer<kuromoji.IpadicFeatures> | null = null;
let tokenizerPromise: Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>> | null = null;

/**
 * kuromojiトークナイザーを初期化する（シングルトン）
 */
export async function getTokenizer(): Promise<kuromoji.Tokenizer<kuromoji.IpadicFeatures>> {
  if (tokenizerInstance) {
    return tokenizerInstance;
  }

  if (tokenizerPromise) {
    return tokenizerPromise;
  }

  tokenizerPromise = new Promise((resolve, reject) => {
    // node_modules内の辞書パスを取得
    const dicPath = path.join(
      process.cwd(),
      'node_modules',
      'kuromoji',
      'dict'
    );

    kuromoji.builder({ dicPath }).build((err, tokenizer) => {
      if (err) {
        tokenizerPromise = null;
        reject(err);
        return;
      }
      tokenizerInstance = tokenizer;
      resolve(tokenizer);
    });
  });

  return tokenizerPromise;
}

/**
 * 日本語テキストをトークン化する
 * 名詞、動詞、形容詞、副詞を抽出
 */
export async function tokenize(text: string): Promise<string[]> {
  const tokenizer = await getTokenizer();
  const tokens = tokenizer.tokenize(text);

  // 検索に有効な品詞のみを抽出
  const validPosPatterns = [
    '名詞',
    '動詞',
    '形容詞',
    '副詞',
  ];

  const result: string[] = [];

  for (const token of tokens) {
    const pos = token.pos;
    
    // 有効な品詞かチェック
    if (validPosPatterns.some(pattern => pos.startsWith(pattern))) {
      // 基本形があれば基本形を使用、なければ表層形を使用
      const term = token.basic_form !== '*' ? token.basic_form : token.surface_form;
      
      // 1文字以下の単語は除外（助詞などのノイズを減らす）
      if (term.length > 1) {
        result.push(term.toLowerCase());
      }
    }
  }

  return result;
}

/**
 * テキストからユニークなトークンを抽出する
 */
export async function extractUniqueTokens(text: string): Promise<string[]> {
  const tokens = await tokenize(text);
  return [...new Set(tokens)];
}

/**
 * Orama用のカスタムトークナイザー関数
 * 同期的に呼び出す必要があるため、事前にtokenizerを初期化しておく必要がある
 */
export function createOramaTokenizer() {
  if (!tokenizerInstance) {
    throw new Error('Tokenizer not initialized. Call getTokenizer() first.');
  }

  return {
    tokenize: (text: string): string[] => {
      const tokens = tokenizerInstance!.tokenize(text);

      const validPosPatterns = ['名詞', '動詞', '形容詞', '副詞'];
      const result: string[] = [];

      for (const token of tokens) {
        const pos = token.pos;
        if (validPosPatterns.some(pattern => pos.startsWith(pattern))) {
          const term = token.basic_form !== '*' ? token.basic_form : token.surface_form;
          if (term.length > 1) {
            result.push(term.toLowerCase());
          }
        }
      }

      // 元のテキストも含める（完全一致検索用）
      // N-gramも追加してより柔軟な検索を可能に
      const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim();
      if (normalized.length > 0) {
        result.push(normalized);
        
        // 2-gramを追加
        for (let i = 0; i < normalized.length - 1; i++) {
          const bigram = normalized.slice(i, i + 2);
          if (bigram.trim().length === 2) {
            result.push(bigram);
          }
        }
      }

      return [...new Set(result)];
    },
    language: 'japanese',
  };
}


