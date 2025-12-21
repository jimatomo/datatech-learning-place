import { create, load, search as oramaSearch } from '@orama/orama';
import fs from 'fs';
import path from 'path';
import { generateQueryEmbedding, getEmbeddingDimension } from './embedder';
import { getTokenizer, createOramaTokenizer } from './tokenizer';

// 検索結果の型
export interface SearchResult {
  id: string;
  type: 'quiz' | 'text';
  title: string;
  content: string;
  tags: string[];
  author: string;
  url: string;
  createdAt: string;
  score: number;
}

// 検索結果と総件数の型
export interface SearchResponse {
  results: SearchResult[];
  total: number;
}

// 検索オプション
export interface SearchOptions {
  type?: 'hybrid' | 'fulltext' | 'vector';
  limit?: number;
  contentType?: 'quiz' | 'text' | 'all';
  tags?: string[];
  minScore?: number; // 最小スコア閾値（0〜1、この値以上の結果のみ返す）
}

// スキーマ定義
const SEARCH_SCHEMA = {
  id: 'string' as const,
  type: 'string' as const,
  title: 'string' as const,
  content: 'string' as const,
  tags: 'string[]' as const,
  author: 'string' as const,
  url: 'string' as const,
  createdAt: 'string' as const,
  embedding: `vector[${getEmbeddingDimension()}]` as const,
};

// Oramaデータベースインスタンス（シングルトン）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dbInstance: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dbPromise: Promise<any> | null = null;

/**
 * 検索クライアントを取得する（シングルトン）
 */
export async function getSearchClient() {
  if (dbInstance) {
    return dbInstance;
  }

  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = loadDatabase().then((db) => {
    dbInstance = db;
    return db;
  }).catch((err) => {
    dbPromise = null;
    throw err;
  });

  return dbPromise;
}

/**
 * データベースをロードする
 */
async function loadDatabase() {
  // トークナイザーを初期化（日本語トークナイザーを使用するため）
  await getTokenizer();

  const indexPath = path.join(process.cwd(), 'data', 'search-index.json');

  // インデックスファイルが存在しない場合は空のDBを作成
  if (!fs.existsSync(indexPath)) {
    console.warn('Search index not found. Creating empty database.');
    return create({
      schema: SEARCH_SCHEMA,
      components: {
        tokenizer: createOramaTokenizer(),
      },
    });
  }

  console.log('Loading search index...');
  const serialized = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

  // スキーマを定義してDBを作成
  const db = await create({
    schema: SEARCH_SCHEMA,
    components: {
      tokenizer: createOramaTokenizer(),
    },
  });

  // 保存したデータをロード
  await load(db, serialized);
  console.log('Search index loaded successfully');

  return db;
}

/**
 * 検索結果をSearchResult型に変換
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapHitToResult(hit: any): SearchResult {
  return {
    id: String(hit.document.id || ''),
    type: hit.document.type as 'quiz' | 'text',
    title: String(hit.document.title || ''),
    content: String(hit.document.content || ''),
    tags: Array.isArray(hit.document.tags) ? hit.document.tags : [],
    author: String(hit.document.author || ''),
    url: String(hit.document.url || ''),
    createdAt: String(hit.document.createdAt || ''),
    score: hit.score,
  };
}

/**
 * 検索結果をタグでフィルタリングする
 * すべての指定されたタグを含むドキュメントのみを返す
 */
function filterByTags(
  results: SearchResult[],
  tags: string[]
): SearchResult[] {
  if (!tags || tags.length === 0) {
    return results;
  }

  return results.filter(result => {
    const resultTags = Array.isArray(result.tags) ? result.tags : [];
    // すべての指定されたタグが結果のタグに含まれているかチェック
    return tags.every(tag => resultTags.includes(tag));
  });
}

/**
 * 全文検索を実行
 */
export async function search(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResponse> {
  const { limit = 20, contentType = 'all', tags, minScore } = options;
  const db = await getSearchClient();

  // フィルター条件を構築
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {};
  if (contentType !== 'all') {
    where.type = contentType;
  }
  // 注意: Oramaのstring[]フィールドではcontainsAllはサポートされていないため、
  // 検索結果を後処理でフィルタリングする

  // タグフィルタリングを考慮して、より多くの結果を取得
  const searchLimit = tags && tags.length > 0 ? limit * 3 : limit;

  const results = await oramaSearch(db, {
    term: query,
    properties: ['title', 'content', 'tags'],
    limit: searchLimit,
    where: Object.keys(where).length > 0 ? where : undefined,
  });

  // 検索結果を変換
  let mappedResults = results.hits.map(mapHitToResult);

  // タグでフィルタリング（後処理）
  if (tags && tags.length > 0) {
    mappedResults = filterByTags(mappedResults, tags);
  }

  // スコアを正規化してminScoreでフィルタリング
  if (minScore !== undefined && mappedResults.length > 0) {
    // 結果内の最大スコアで正規化（最高スコアが1.0になる）
    // フォールバックの1は全スコアが0の場合のみ使用（0除算防止）
    const maxScore = Math.max(...mappedResults.map(r => r.score)) || 1;
    mappedResults = mappedResults
      .map(r => ({ ...r, score: r.score / maxScore }))
      .filter(r => r.score >= minScore);
  }

  // limitを適用
  const finalResults = mappedResults.slice(0, limit);

  return {
    results: finalResults,
    total: mappedResults.length,
  };
}

/**
 * ベクター検索を実行
 */
export async function vectorSearch(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResponse> {
  const { limit = 20, contentType = 'all', tags, minScore } = options;
  const db = await getSearchClient();

  // クエリのembeddingを生成
  const queryEmbedding = await generateQueryEmbedding(query);

  // フィルター条件を構築
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {};
  if (contentType !== 'all') {
    where.type = contentType;
  }
  // 注意: Oramaのstring[]フィールドではcontainsAllはサポートされていないため、
  // 検索結果を後処理でフィルタリングする

  // タグフィルタリングを考慮して、より多くの結果を取得
  const searchLimit = tags && tags.length > 0 ? limit * 3 : limit;

  // Orama v3ではsearchにmodeを指定してベクター検索
  const results = await oramaSearch(db, {
    mode: 'vector',
    vector: {
      value: queryEmbedding,
      property: 'embedding',
    },
    limit: searchLimit,
    where: Object.keys(where).length > 0 ? where : undefined,
    includeVectors: false,
  });

  // 検索結果を変換
  let mappedResults = results.hits.map(mapHitToResult);

  // タグでフィルタリング（後処理）
  if (tags && tags.length > 0) {
    mappedResults = filterByTags(mappedResults, tags);
  }

  // スコアを正規化してminScoreでフィルタリング
  if (minScore !== undefined && mappedResults.length > 0) {
    // 結果内の最大スコアで正規化（最高スコアが1.0になる）
    // フォールバックの1は全スコアが0の場合のみ使用（0除算防止）
    const maxScore = Math.max(...mappedResults.map(r => r.score)) || 1;
    mappedResults = mappedResults
      .map(r => ({ ...r, score: r.score / maxScore }))
      .filter(r => r.score >= minScore);
  }

  // limitを適用
  const finalResults = mappedResults.slice(0, limit);

  return {
    results: finalResults,
    total: mappedResults.length,
  };
}

/**
 * ハイブリッド検索を実行（全文検索 + ベクター検索）
 */
export async function hybridSearch(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResponse> {
  const { limit = 20 } = options;

  // サブクエリではminScoreを適用しない（マージ後に適用するため）
  const { minScore, ...subOptions } = options;

  // 全文検索とベクター検索を並列実行
  const [fulltextResponse, vectorResponse] = await Promise.all([
    search(query, { ...subOptions, limit: limit * 2 }),
    vectorSearch(query, { ...subOptions, limit: limit * 2 }),
  ]);

  const fulltextResults = fulltextResponse.results;
  const vectorResults = vectorResponse.results;

  // スコアを正規化してマージ
  const resultMap = new Map<string, SearchResult & { combinedScore: number }>();

  // 全文検索結果を追加（重み: 0.4）
  // 結果内の最大スコアで正規化（フォールバックの1は結果が空または全スコア0の場合のみ）
  const maxFulltextScore = Math.max(...fulltextResults.map(r => r.score)) || 1;
  for (const result of fulltextResults) {
    const normalizedScore = result.score / maxFulltextScore;
    resultMap.set(result.id, {
      ...result,
      combinedScore: normalizedScore * 0.4,
    });
  }

  // ベクター検索結果を追加/マージ（重み: 0.6）
  // 結果内の最大スコアで正規化（フォールバックの1は結果が空または全スコア0の場合のみ）
  const maxVectorScore = Math.max(...vectorResults.map(r => r.score)) || 1;
  for (const result of vectorResults) {
    const normalizedScore = result.score / maxVectorScore;
    const existing = resultMap.get(result.id);
    
    if (existing) {
      existing.combinedScore += normalizedScore * 0.6;
    } else {
      resultMap.set(result.id, {
        ...result,
        combinedScore: normalizedScore * 0.6,
      });
    }
  }

  // スコアでソート
  const sortedResults = Array.from(resultMap.values())
    .sort((a, b) => b.combinedScore - a.combinedScore);

  // combinedScoreを正規化してscoreとして返す
  // これにより、片方の検索のみで見つかった結果も適切にスコアリングされる
  // （例：全文検索のみの結果でも最大スコアが1.0になりうる）
  const maxCombinedScore = Math.max(...sortedResults.map(r => r.combinedScore), 0.001);
  const scoredResults = sortedResults.map(({ combinedScore, ...rest }) => ({
    ...rest,
    score: combinedScore / maxCombinedScore,
  }));

  // 最小スコア閾値でフィルタリング（limitの前に適用）
  const filteredResults = minScore !== undefined
    ? scoredResults.filter(r => r.score >= minScore)
    : scoredResults;

  // 最後にlimitを適用
  const finalResults = filteredResults.slice(0, limit);

  return {
    results: finalResults,
    total: filteredResults.length, // フィルタ後の総件数
  };
}

