# Snowflake Cortex AISQL 包括的ガイド
## 2025年6月25日版 - 最新機能完全解説

---

## 目次
1. [Cortex AISQLとは](#cortex-aisqlとは)
2. [主要関数一覧](#主要関数一覧)
3. [AI_COMPLETE関数 詳細](#ai_complete関数-詳細)
4. [その他のAISQL関数](#その他のaisql関数)
5. [実践的な使用例](#実践的な使用例)
6. [パフォーマンス最適化](#パフォーマンス最適化)
7. [コスト管理](#コスト管理)
8. [トラブルシューティング](#トラブルシューティング)

---

## Cortex AISQLとは

Snowflake Cortex AISQLは、SQLクエリ内で直接AIモデルを使用できる革新的な機能セットです。従来のLLM Functions（SNOWFLAKE.CORTEX名前空間）を含み、新たなAI機能が追加されています。

### 主な特徴
- **マルチモーダル対応**: テキストと画像の両方を処理可能
- **高速・低コスト**: Snowflakeエンジンに深く統合され、従来比30%高速、最大60%コスト削減
- **セキュリティ**: データがSnowflake内に留まるため安全
- **簡単な統合**: 慣れ親しんだSQL構文で使用可能

---

## 主要関数一覧

### AISQLコア関数
| 関数名 | 用途 | 入力タイプ |
|--------|------|-----------|
| `AI_COMPLETE` | テキスト生成・会話 | テキスト・画像 |
| `AI_CLASSIFY` | 分類（マルチラベル対応） | テキスト・画像 |
| `AI_FILTER` | 条件フィルタリング | テキスト・画像 |
| `AI_AGG` | 集約分析 | テキスト |
| `AI_SUMMARIZE_AGG` | 集約要約 | テキスト |
| `AI_SIMILARITY` | 類似度計算 | テキスト・画像 |

### 従来のLLM関数（SNOWFLAKE.CORTEX）
| 関数名 | 用途 | 特徴 |
|--------|------|------|
| `TRANSLATE` | 翻訳 | 多言語対応 |
| `SENTIMENT` | 感情分析 | -1〜1のスコア |
| `EXTRACT_ANSWER` | 回答抽出 | Q&A形式 |
| `SUMMARIZE` | 要約 | 単一テキスト |
| `PARSE_DOCUMENT` | 文書解析 | OCR・レイアウト解析 |

### ヘルパー関数
| 関数名 | 用途 |
|--------|------|
| `COUNT_TOKENS` | トークン数計算 |
| `TRY_COMPLETE` | エラー時NULL返却 |

---

## AI_COMPLETE関数 詳細

### 基本構文
```sql
AI_COMPLETE(model, prompt_or_history [, options])
```

### パラメータ詳細

#### model（必須）
使用するAIモデルを指定。推奨モデル：

**大型モデル（高性能）**
- `claude-3-7-sonnet`: 最高性能、推論能力に優れる
- `mistral-large2`: 多言語・コード生成に強い
- `llama3.1-405b`: 大容量コンテキスト（128K）

**中型モデル（バランス型）**
- `llama3.1-70b`: コストパフォーマンス良好
- `snowflake-arctic`: Snowflake専用最適化
- `mixtral-8x7b`: 低レイテンシ

**小型モデル（高速・低コスト）**
- `llama3.1-8b`: 軽量、高速処理
- `mistral-7b`: シンプルなタスクに最適
- `gemma-7b`: コード生成に適している

#### prompt_or_history（必須）
- **文字列**: 単純なプロンプト
- **配列**: 会話履歴（role-content形式）

#### options（オプション）
```sql
{
    'max_tokens': 数値,        -- 最大出力トークン数
    'temperature': 0.0-1.0,    -- ランダム性（0=決定論的、1=創造的）
    'top_p': 0.0-1.0          -- 多様性制御
}
```

### 使用例集

#### 1. 基本的なテキスト生成
```sql
SELECT AI_COMPLETE(
    'llama3.1-70b',
    'Snowflakeのメリットを3つ挙げてください。'
) AS response;
```

#### 2. パラメータ付き高度な使用
```sql
SELECT AI_COMPLETE(
    'claude-3-5-sonnet',
    'この商品レビューの感情を分析してください: ' || review_text,
    {
        'max_tokens': 100,
        'temperature': 0.2
    }
) AS sentiment_analysis
FROM product_reviews;
```

#### 3. 会話形式（チャット）
```sql
SELECT AI_COMPLETE(
    'claude-3-5-sonnet',
    [
        {
            'role': 'system',
            'content': 'あなたは親切なカスタマーサポート担当者です。'
        },
        {
            'role': 'user',
            'content': '商品の返品方法を教えてください。'
        }
    ],
    {'temperature': 0.3}
) AS support_response;
```

---

## その他のAISQL関数

### AI_CLASSIFY: 分類機能

#### 基本使用法
```sql
-- テキスト分類
SELECT AI_CLASSIFY(
    '今日は良い天気ですね',
    ['ポジティブ', 'ネガティブ', 'ニュートラル']
) AS classification;

-- マルチラベル分類
SELECT AI_CLASSIFY(
    customer_feedback,
    ['品質', '価格', '配送', 'サービス'],
    {'multi_label': true}
) AS feedback_categories
FROM reviews;
```

### AI_FILTER: 条件フィルタリング

#### JOINでの使用
```sql
SELECT c.customer_id, c.inquiry, s.solution
FROM customer_inquiries c
LEFT JOIN solution_database s
ON AI_FILTER(
    PROMPT('この問い合わせ「{0}」に対してこの解決策「{1}」は適切ですか？', 
           c.inquiry, s.solution)
);
```

#### WHERE句での使用
```sql
SELECT * 
FROM product_reviews
WHERE AI_FILTER('このレビューは否定的な内容ですか？: ' || review_text);
```

### AI_AGG: 集約分析

#### 複数行の要約
```sql
SELECT 
    product_category,
    AI_AGG(
        customer_review,
        '商品カテゴリ別の主要な課題と改善点をまとめてください。'
    ) AS category_insights
FROM reviews
GROUP BY product_category;
```

### AI_SIMILARITY: 類似度計算

#### 類似製品検索
```sql
WITH target_product AS (
    SELECT product_description 
    FROM products 
    WHERE product_id = 'P001'
)
SELECT 
    p.product_id,
    p.product_name,
    AI_SIMILARITY(
        p.product_description,
        (SELECT product_description FROM target_product)
    ) AS similarity_score
FROM products p
WHERE p.product_id != 'P001'
ORDER BY similarity_score DESC
LIMIT 5;
```

---

## 実践的な使用例

### 1. 顧客サポートシステム

```sql
-- 問い合わせの自動分類と優先度付け
WITH classified_inquiries AS (
    SELECT 
        inquiry_id,
        customer_message,
        AI_CLASSIFY(
            customer_message,
            ['技術的問題', '請求問題', '返品・交換', '一般的質問']
        ) AS category,
        AI_COMPLETE(
            'llama3.1-70b',
            '緊急度を1-5で評価（5が最高）: ' || customer_message,
            {'max_tokens': 10, 'temperature': 0.1}
        ) AS urgency_raw
    FROM customer_inquiries
)
SELECT 
    inquiry_id,
    category,
    CAST(REGEXP_SUBSTR(urgency_raw, '\\d') AS INT) AS urgency_level,
    CASE 
        WHEN CAST(REGEXP_SUBSTR(urgency_raw, '\\d') AS INT) >= 4 THEN '高優先度'
        WHEN CAST(REGEXP_SUBSTR(urgency_raw, '\\d') AS INT) >= 3 THEN '中優先度'
        ELSE '低優先度'
    END AS priority_label
FROM classified_inquiries
ORDER BY urgency_level DESC;
```

### 2. ソーシャルメディア監視

```sql
-- ブランド言及の感情分析とトレンド把握
SELECT 
    DATE_TRUNC('day', post_date) AS analysis_date,
    platform,
    COUNT(*) AS total_mentions,
    
    -- 感情分析
    SUM(CASE 
        WHEN AI_CLASSIFY(post_content, ['ポジティブ', 'ネガティブ', 'ニュートラル']) 
             LIKE '%ポジティブ%' THEN 1 ELSE 0 
    END) AS positive_mentions,
    
    -- 主要トピックの抽出
    AI_AGG(
        post_content,
        'この日のソーシャルメディア投稿から主要なトピックと感情の傾向を分析してください。'
    ) AS daily_summary
    
FROM social_media_posts 
WHERE post_content LIKE '%our_brand%'
GROUP BY DATE_TRUNC('day', post_date), platform
ORDER BY analysis_date DESC;
```

### 3. 製品レビュー分析

```sql
-- レビューの多面的分析
WITH review_analysis AS (
    SELECT 
        product_id,
        review_id,
        review_text,
        rating,
        
        -- 詳細分類
        AI_CLASSIFY(
            review_text,
            ['品質', '価格', '使いやすさ', '配送', 'カスタマーサービス'],
            {'multi_label': true}
        ) AS aspects,
        
        -- アスペクト別感情
        AI_COMPLETE(
            'claude-3-5-sonnet',
            'このレビューについて、品質・価格・使いやすさの各観点での満足度を5段階で評価してください（JSON形式）: ' || review_text,
            {'max_tokens': 150, 'temperature': 0.2}
        ) AS aspect_sentiment
        
    FROM product_reviews
    WHERE review_date >= CURRENT_DATE - INTERVAL '30 days'
)
SELECT 
    product_id,
    COUNT(*) AS review_count,
    AVG(rating) AS avg_rating,
    
    -- 主要な改善点の抽出
    AI_AGG(
        review_text,
        '製品改善のための具体的な提案をレビューから抽出してください。優先度順に整理してください。'
    ) AS improvement_suggestions
    
FROM review_analysis
GROUP BY product_id
HAVING COUNT(*) >= 10  -- 十分なレビュー数がある製品のみ
ORDER BY avg_rating DESC;
```

---

## パフォーマンス最適化

### 1. ウェアハウスサイズ
```sql
-- 推奨設定
USE WAREHOUSE COMPUTE_WH_M;  -- MEDIUMサイズ推奨

-- 大型処理の場合でもLARGE以上は非推奨
-- AI処理はウェアハウスサイズよりもモデル性能に依存
```

### 2. バッチ処理
```sql
-- 大量データの処理時は分割実行
SELECT 
    batch_id,
    AI_COMPLETE('llama3.1-70b', prompt_text) AS result
FROM (
    SELECT 
        NTILE(10) OVER (ORDER BY id) AS batch_id,
        id,
        prompt_text
    FROM large_dataset
) 
WHERE batch_id = 1;  -- バッチごとに実行
```

### 3. プロンプト最適化
```sql
-- 効率的なプロンプト設計
SELECT 
    -- ❌ 冗長なプロンプト
    AI_COMPLETE('llama3.1-70b', 
        'この非常に長いテキストについて詳細に分析して、あらゆる観点から...' || long_text
    ) AS inefficient,
    
    -- ✅ 簡潔で明確なプロンプト
    AI_COMPLETE('llama3.1-70b',
        '感情分析（ポジティブ/ネガティブ/ニュートラル）: ' || LEFT(long_text, 200)
    ) AS efficient
FROM data_table;
```

---

## コスト管理

### 1. 使用量監視
```sql
-- Cortex AISQL関数の使用量確認
SELECT 
    function_name,
    model_name,
    SUM(input_tokens) AS total_input_tokens,
    SUM(output_tokens) AS total_output_tokens,
    SUM(credits_used) AS total_credits,
    COUNT(*) AS call_count
FROM SNOWFLAKE.ACCOUNT_USAGE.CORTEX_FUNCTIONS_USAGE_HISTORY
WHERE DATE(start_time) >= CURRENT_DATE - 7
GROUP BY function_name, model_name
ORDER BY total_credits DESC;
```

### 2. クエリレベル分析
```sql
-- 高コストクエリの特定
SELECT 
    query_id,
    user_name,
    warehouse_name,
    SUM(credits_used) AS query_credits,
    SUM(input_tokens + output_tokens) AS total_tokens
FROM SNOWFLAKE.ACCOUNT_USAGE.CORTEX_FUNCTIONS_QUERY_USAGE_HISTORY
WHERE DATE(start_time) >= CURRENT_DATE - 1
GROUP BY query_id, user_name, warehouse_name
HAVING SUM(credits_used) > 10  -- 高コストクエリ
ORDER BY query_credits DESC;
```

### 3. コスト最適化のベストプラクティス

#### トークン数事前確認
```sql
-- 処理前にコスト見積もり
WITH token_analysis AS (
    SELECT 
        id,
        content,
        COUNT_TOKENS('llama3.1-70b', content) AS estimated_tokens,
        CASE 
            WHEN COUNT_TOKENS('llama3.1-70b', content) > 1000 THEN '高コスト'
            WHEN COUNT_TOKENS('llama3.1-70b', content) > 500 THEN '中コスト'
            ELSE '低コスト'
        END AS cost_category
    FROM source_data
)
SELECT 
    cost_category,
    COUNT(*) AS record_count,
    SUM(estimated_tokens) AS total_tokens,
    SUM(estimated_tokens) * 0.0002 AS estimated_credits  -- 概算
FROM token_analysis
GROUP BY cost_category;
```

#### 効率的なモデル選択
```sql
-- タスクに応じたモデル選択
SELECT 
    CASE 
        WHEN LENGTH(task_description) < 100 THEN 
            AI_COMPLETE('mistral-7b', task_description)  -- 軽量タスク
        WHEN task_complexity = 'simple' THEN 
            AI_COMPLETE('llama3.1-8b', task_description)  -- 中程度
        ELSE 
            AI_COMPLETE('claude-3-5-sonnet', task_description)  -- 複雑タスク
    END AS optimized_result
FROM tasks;
```

---

## トラブルシューティング

### 1. よくあるエラーと対処法

#### トークン制限エラー
```sql
-- エラー: max tokens of 128000 exceeded
-- 対処: テキストを分割または要約

WITH chunked_text AS (
    SELECT 
        id,
        SUBSTR(long_text, 1, 50000) AS chunk1,
        SUBSTR(long_text, 50001, 50000) AS chunk2
    FROM large_documents
)
SELECT 
    id,
    AI_COMPLETE('llama3.1-70b', '要約: ' || chunk1) AS summary1,
    AI_COMPLETE('llama3.1-70b', '要約: ' || chunk2) AS summary2
FROM chunked_text;
```

#### スロットリングエラー
```sql
-- エラー: too many requests
-- 対処: リトライロジックまたは小さなバッチ

-- TRY_COMPLETEでエラー回避
SELECT 
    id,
    COALESCE(
        TRY_COMPLETE('llama3.1-70b', prompt_text),
        'システム負荷のため後で再試行'
    ) AS safe_result
FROM data_table;
```

### 2. パフォーマンス問題の診断

#### 実行時間の監視
```sql
-- 長時間実行クエリの分析
SELECT 
    query_id,
    user_name,
    DATEDIFF('seconds', start_time, end_time) AS duration_seconds,
    function_name,
    model_name,
    input_tokens,
    output_tokens
FROM SNOWFLAKE.ACCOUNT_USAGE.CORTEX_FUNCTIONS_USAGE_HISTORY
WHERE start_time >= CURRENT_DATE - 1
AND DATEDIFF('seconds', start_time, end_time) > 30  -- 30秒以上
ORDER BY duration_seconds DESC;
```

### 3. 権限問題の解決

#### 権限確認
```sql
-- 現在のユーザーの権限確認
SHOW GRANTS TO USER CURRENT_USER();

-- Cortex権限の確認
SELECT * FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()))
WHERE "privilege" LIKE '%CORTEX%';
```

#### 権限付与（管理者用）
```sql
-- 必要な権限の付与
GRANT DATABASE ROLE SNOWFLAKE.CORTEX_USER TO ROLE your_role;
GRANT ROLE your_role TO USER your_user;
```

---

## まとめ

Snowflake Cortex AISQLは、従来のデータ分析に革新的なAI機能を統合する強力なツールです。適切な使用により、以下のメリットが得られます：

- **効率性**: 複雑なAI処理をSQLで直接実行
- **コスト効率**: 外部APIより最大60%のコスト削減
- **セキュリティ**: データがSnowflake内で安全に処理
- **スケーラビリティ**: Snowflakeの分散処理能力を活用

成功のカギは、適切なモデル選択、効率的なプロンプト設計、そして継続的なコスト監視です。このガイドを参考に、あなたの組織でのAI活用を加速させてください。