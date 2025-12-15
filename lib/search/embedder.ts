import { pipeline, type FeatureExtractionPipeline } from '@xenova/transformers';

// Embeddingパイプラインのシングルトンインスタンス
let embeddingPipeline: FeatureExtractionPipeline | null = null;
let embeddingPromise: Promise<FeatureExtractionPipeline> | null = null;

// 使用するモデル（多言語対応、軽量）
const MODEL_NAME = 'Xenova/multilingual-e5-small';

/**
 * Embeddingパイプラインを初期化する（シングルトン）
 */
export async function getEmbeddingPipeline(): Promise<FeatureExtractionPipeline> {
  if (embeddingPipeline) {
    return embeddingPipeline;
  }

  if (embeddingPromise) {
    return embeddingPromise;
  }

  console.log(`Loading embedding model: ${MODEL_NAME}...`);
  
  // キャッシュディレクトリを決定（環境変数優先、Docker実行時は書き込み可能なディレクトリを使用）
  const cacheDir = process.env.TRANSFORMERS_CACHE || './.cache/transformers';
  
  embeddingPromise = pipeline('feature-extraction', MODEL_NAME, {
    // キャッシュディレクトリを指定
    cache_dir: cacheDir,
  }).then((p) => {
    embeddingPipeline = p;
    console.log('Embedding model loaded successfully');
    return p;
  }).catch((err) => {
    embeddingPromise = null;
    throw err;
  });

  return embeddingPromise;
}

/**
 * テキストからembeddingベクトルを生成する
 * @param text 入力テキスト
 * @returns embedding ベクトル（Float32Array）
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const pipe = await getEmbeddingPipeline();
  
  // E5モデルは"query: "または"passage: "プレフィックスを推奨
  // 検索クエリには"query: "、ドキュメントには"passage: "を使用
  const prefixedText = `passage: ${text}`;
  
  const output = await pipe(prefixedText, {
    pooling: 'mean',
    normalize: true,
  });

  // Tensorからnumber[]に変換
  return Array.from(output.data as Float32Array);
}

/**
 * 検索クエリ用のembeddingを生成する
 * @param query 検索クエリ
 * @returns embedding ベクトル
 */
export async function generateQueryEmbedding(query: string): Promise<number[]> {
  const pipe = await getEmbeddingPipeline();
  
  // E5モデルのクエリプレフィックス
  const prefixedQuery = `query: ${query}`;
  
  const output = await pipe(prefixedQuery, {
    pooling: 'mean',
    normalize: true,
  });

  return Array.from(output.data as Float32Array);
}

/**
 * 複数テキストのembeddingを一括生成する
 * @param texts テキストの配列
 * @returns embedding ベクトルの配列
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const results: number[][] = [];
  
  // バッチ処理（メモリ効率のため少しずつ処理）
  const batchSize = 10;
  
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(text => generateEmbedding(text))
    );
    results.push(...batchResults);
    
    // 進捗表示
    if ((i + batchSize) % 50 === 0 || i + batchSize >= texts.length) {
      console.log(`Embedding progress: ${Math.min(i + batchSize, texts.length)}/${texts.length}`);
    }
  }
  
  return results;
}

/**
 * embeddingの次元数を取得する
 */
export function getEmbeddingDimension(): number {
  // multilingual-e5-smallの次元数
  return 384;
}
