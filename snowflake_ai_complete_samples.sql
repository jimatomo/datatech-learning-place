-- ===============================================
-- Snowflake AI_COMPLETE関数 実践サンプル集
-- 2025年6月25日版
-- ===============================================

-- 1. テストデータの準備
-- ===============================================

-- サンプルテーブルの作成
CREATE OR REPLACE TABLE CUSTOMER_EMAILS (
    EMAIL_ID INT,
    CUSTOMER_NAME STRING,
    EMAIL_CONTENT STRING,
    RECEIVED_DATE DATE
);

-- サンプルデータの挿入
INSERT INTO CUSTOMER_EMAILS VALUES
(1, '田中太郎', 'いつもお世話になっております。先日購入した商品について、非常に満足しています。配送も早く、梱包も丁寧でした。ありがとうございました。', '2025-06-20'),
(2, '佐藤花子', '注文した商品がまだ届きません。注文から1週間が経過しており、非常に困っています。至急対応をお願いします。', '2025-06-21'),
(3, '鈴木一郎', '商品の使用方法について質問があります。マニュアルを読みましたが、設定方法がよく分かりません。', '2025-06-22'),
(4, '高橋美咲', '先月購入した商品が故障しました。保証期間内なので交換をお願いしたいです。', '2025-06-23'),
(5, 'Johnson Smith', 'I love this product! The quality is amazing and delivery was super fast. Will definitely order again!', '2025-06-24');

-- 2. 基本的なAI_COMPLETE使用例
-- ===============================================

-- 2-1. シンプルな感情分析
SELECT 
    EMAIL_ID,
    CUSTOMER_NAME,
    AI_COMPLETE(
        'llama3.1-70b',
        'この顧客メールの感情を「ポジティブ」「ネガティブ」「ニュートラル」で分類してください: ' || EMAIL_CONTENT
    ) AS sentiment
FROM CUSTOMER_EMAILS;

-- 2-2. 詳細な感情分析（JSON形式）
SELECT 
    EMAIL_ID,
    CUSTOMER_NAME,
    AI_COMPLETE(
        'llama3.1-70b',
        'この顧客メールを分析して、以下のJSON形式で回答してください:
        {"sentiment": "ポジティブ/ネガティブ/ニュートラル", "urgency": "高/中/低", "category": "問い合わせ/苦情/感謝/質問"}
        メール内容: ' || EMAIL_CONTENT,
        {
            'max_tokens': 100,
            'temperature': 0.2
        }
    ) AS detailed_analysis
FROM CUSTOMER_EMAILS;

-- 3. 実用的な業務例
-- ===============================================

-- 3-1. 自動返信メッセージの生成
SELECT 
    EMAIL_ID,
    CUSTOMER_NAME,
    EMAIL_CONTENT,
    AI_COMPLETE(
        'claude-3-5-sonnet',
        'この顧客メールに対する丁寧で適切な返信メッセージを日本語で作成してください。顧客名は' || CUSTOMER_NAME || 'さんです。
        
        元のメール内容: ' || EMAIL_CONTENT,
        {
            'max_tokens': 200,
            'temperature': 0.3
        }
    ) AS auto_reply
FROM CUSTOMER_EMAILS
WHERE EMAIL_ID IN (1, 2, 3);

-- 3-2. 多言語対応（翻訳＋分析）
SELECT 
    EMAIL_ID,
    CUSTOMER_NAME,
    EMAIL_CONTENT,
    AI_COMPLETE(
        'mistral-large2',
        'この顧客メールを日本語に翻訳してから、感情と緊急度を分析してください:
        
        メール内容: ' || EMAIL_CONTENT,
        {
            'max_tokens': 150,
            'temperature': 0.1
        }
    ) AS translation_and_analysis
FROM CUSTOMER_EMAILS
WHERE EMAIL_ID = 5;

-- 4. エラーハンドリング
-- ===============================================

-- 4-1. TRY_COMPLETE を使用した安全な実行
SELECT 
    EMAIL_ID,
    CUSTOMER_NAME,
    COALESCE(
        TRY_COMPLETE(
            'llama3.1-70b',
            'この顧客メールの感情を分析してください: ' || EMAIL_CONTENT
        ),
        '分析に失敗しました'
    ) AS safe_sentiment
FROM CUSTOMER_EMAILS;

-- 5. バッチ処理用のクエリ
-- ===============================================

-- 5-1. 優先度付きメール分類
WITH email_priority AS (
    SELECT 
        EMAIL_ID,
        CUSTOMER_NAME,
        EMAIL_CONTENT,
        RECEIVED_DATE,
        AI_COMPLETE(
            'llama3.1-70b',
            'このメールの緊急度を1-10のスケールで評価し、理由も含めて回答してください: ' || EMAIL_CONTENT,
            {'max_tokens': 80, 'temperature': 0.1}
        ) AS urgency_score
    FROM CUSTOMER_EMAILS
)
SELECT *
FROM email_priority
ORDER BY 
    CASE 
        WHEN urgency_score LIKE '%10%' OR urgency_score LIKE '%9%' THEN 1
        WHEN urgency_score LIKE '%8%' OR urgency_score LIKE '%7%' THEN 2
        ELSE 3
    END,
    RECEIVED_DATE DESC;

-- 6. コスト最適化のためのトークン数確認
-- ===============================================

-- 6-1. 事前にトークン数を確認
SELECT 
    EMAIL_ID,
    EMAIL_CONTENT,
    COUNT_TOKENS('llama3.1-70b', EMAIL_CONTENT) AS input_tokens,
    CASE 
        WHEN COUNT_TOKENS('llama3.1-70b', EMAIL_CONTENT) > 1000 
        THEN 'トークン数が多いため要注意' 
        ELSE 'OK' 
    END AS token_warning
FROM CUSTOMER_EMAILS;

-- 7. 高度な使用例（会話形式）
-- ===============================================

-- 7-1. 会話形式でのAI分析
SELECT 
    EMAIL_ID,
    AI_COMPLETE(
        'claude-3-5-sonnet',
        [
            {
                'role': 'system',
                'content': 'あなたは顧客サービスの専門家です。顧客メールを分析して、適切な対応方針を提案してください。'
            },
            {
                'role': 'user',
                'content': '以下の顧客メールを分析してください: ' || EMAIL_CONTENT
            }
        ],
        {
            'max_tokens': 150,
            'temperature': 0.3
        }
    ) AS expert_analysis
FROM CUSTOMER_EMAILS
WHERE EMAIL_ID = 2;

-- 8. 集計・レポート用クエリ
-- ===============================================

-- 8-1. 日次感情分析レポート
WITH daily_sentiment AS (
    SELECT 
        RECEIVED_DATE,
        EMAIL_ID,
        AI_COMPLETE(
            'llama3.1-70b',
            'このメールの感情を「ポジティブ」「ネガティブ」「ニュートラル」で分類してください: ' || EMAIL_CONTENT
        ) AS sentiment_raw
    FROM CUSTOMER_EMAILS
),
sentiment_summary AS (
    SELECT 
        RECEIVED_DATE,
        COUNT(*) AS total_emails,
        SUM(CASE WHEN sentiment_raw LIKE '%ポジティブ%' THEN 1 ELSE 0 END) AS positive_count,
        SUM(CASE WHEN sentiment_raw LIKE '%ネガティブ%' THEN 1 ELSE 0 END) AS negative_count,
        SUM(CASE WHEN sentiment_raw LIKE '%ニュートラル%' THEN 1 ELSE 0 END) AS neutral_count
    FROM daily_sentiment
    GROUP BY RECEIVED_DATE
)
SELECT 
    RECEIVED_DATE,
    total_emails,
    positive_count,
    negative_count,
    neutral_count,
    ROUND(positive_count::FLOAT / total_emails * 100, 2) AS positive_percentage,
    ROUND(negative_count::FLOAT / total_emails * 100, 2) AS negative_percentage
FROM sentiment_summary
ORDER BY RECEIVED_DATE DESC;

-- 9. パフォーマンス最適化
-- ===============================================

-- 推奨: MEDIUM以下のウェアハウスを使用
-- USE WAREHOUSE COMPUTE_WH_M;  -- MEDIUMサイズ

-- 大量データ処理時は小さなバッチに分割
SELECT 
    EMAIL_ID,
    AI_COMPLETE('llama3.1-70b', 
        '簡潔に感情を分析: ' || LEFT(EMAIL_CONTENT, 200)  -- 長いテキストを制限
    ) AS quick_sentiment
FROM CUSTOMER_EMAILS
LIMIT 10;  -- バッチサイズを制限

-- ===============================================
-- 実行時の注意事項
-- ===============================================
/*
1. ウェアハウスサイズ: MEDIUM以下を推奨
2. トークン制限: モデルごとの制限を確認
3. コスト監視: CORTEX_FUNCTIONS_USAGE_HISTORY ビューで使用量確認
4. エラー処理: TRY_COMPLETE を活用
5. 権限: SNOWFLAKE.CORTEX_USER ロールが必要
*/