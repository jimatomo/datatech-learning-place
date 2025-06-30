# Snowflake Cortex AISQL ハンズオンワークショップ
## 実践的学習プログラム - 2025年6月25日版

---

## ワークショップ概要

このワークショップでは、Snowflake Cortex AISQLの機能を段階的に学習し、実際のビジネスシナリオで活用できるスキルを身につけます。

### 学習目標
- [ ] AI_COMPLETE関数の基本的な使用方法を理解する
- [ ] 各種AISQL関数の特徴と適用場面を把握する
- [ ] 実際のビジネスデータを使用したAI分析を実行する
- [ ] コスト最適化とパフォーマンス向上のベストプラクティスを習得する
- [ ] エラーハンドリングとトラブルシューティングを実践する

### 前提条件
- [ ] Snowflakeアカウントへのアクセス権限
- [ ] `SNOWFLAKE.CORTEX_USER`ロールが付与されている
- [ ] 基本的なSQL知識

---

## セクション1: 環境準備とセットアップ

### 演習1.1: 権限確認
```sql
-- 現在のロールと権限を確認
SELECT CURRENT_ROLE();
SHOW GRANTS TO USER CURRENT_USER();

-- Cortex関数の使用権限を確認
SELECT * FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()))
WHERE "privilege" LIKE '%CORTEX%' OR "granted_on" = 'DATABASE' AND "name" = 'SNOWFLAKE';
```

**✅ 確認ポイント:**
- [ ] CORTEX_USERロールまたは関連権限が表示されるか
- [ ] SNOWFLAKEデータベースへのIMPORTED PRIVILEGESがあるか

### 演習1.2: ウェアハウス設定
```sql
-- 適切なサイズのウェアハウスを作成・使用
CREATE WAREHOUSE IF NOT EXISTS CORTEX_WORKSHOP_WH 
WITH WAREHOUSE_SIZE = 'MEDIUM'
AUTO_SUSPEND = 60
AUTO_RESUME = TRUE;

USE WAREHOUSE CORTEX_WORKSHOP_WH;
```

**✅ 確認ポイント:**
- [ ] ウェアハウスサイズがMEDIUM以下に設定されているか
- [ ] 自動サスペンド機能が有効になっているか

### 演習1.3: 基本動作確認
```sql
-- シンプルなAI_COMPLETE呼び出しでテスト
SELECT AI_COMPLETE(
    'llama3.1-70b',
    'Hello, can you respond in Japanese?'
) AS test_response;
```

**期待される結果:** 日本語での応答が返ってくる

---

## セクション2: AI_COMPLETE関数の基礎

### 演習2.1: 基本的なテキスト生成

```sql
-- 製品説明の生成
SELECT AI_COMPLETE(
    'llama3.1-70b',
    'ノートパソコン「ThinkPad X1 Carbon」の魅力的な商品説明を200文字で作成してください。'
) AS product_description;

-- 複数の温度設定での比較
SELECT 
    '低温度 (0.1)' AS setting,
    AI_COMPLETE(
        'claude-3-5-sonnet',
        'データ分析の重要性について説明してください。',
        {'temperature': 0.1, 'max_tokens': 150}
    ) AS response
UNION ALL
SELECT 
    '高温度 (0.9)' AS setting,
    AI_COMPLETE(
        'claude-3-5-sonnet',
        'データ分析の重要性について説明してください。',
        {'temperature': 0.9, 'max_tokens': 150}
    ) AS response;
```

**✅ 学習ポイント:**
- [ ] 温度設定が回答の創造性に与える影響を観察する
- [ ] max_tokensの制限を理解する

### 演習2.2: 会話形式の使用

```sql
-- システムロールを使用した専門的な回答
SELECT AI_COMPLETE(
    'claude-3-5-sonnet',
    [
        {
            'role': 'system',
            'content': 'あなたはSnowflakeの専門家です。技術的で正確な回答を提供してください。'
        },
        {
            'role': 'user',
            'content': 'Dynamic Tablesとは何ですか？従来のViewとの違いを教えてください。'
        }
    ],
    {'max_tokens': 200}
) AS expert_answer;

-- 継続的な会話
SELECT AI_COMPLETE(
    'claude-3-5-sonnet',
    [
        {
            'role': 'system',
            'content': 'あなたは親切なカスタマーサポート担当者です。'
        },
        {
            'role': 'user',
            'content': '商品が破損していました。'
        },
        {
            'role': 'assistant',
            'content': '申し訳ございません。すぐに新しい商品をお送りいたします。'
        },
        {
            'role': 'user',
            'content': '送料は誰が負担しますか？'
        }
    ]
) AS continued_conversation;
```

**✅ 学習ポイント:**
- [ ] role（system, user, assistant）の使い分けを理解する
- [ ] 会話の文脈が後続の回答に与える影響を確認する

---

## セクション3: 実データを使った実践演習

### 演習3.1: サンプルデータセットの作成

```sql
-- データベースとスキーマの作成
CREATE DATABASE IF NOT EXISTS CORTEX_WORKSHOP;
USE DATABASE CORTEX_WORKSHOP;
CREATE SCHEMA IF NOT EXISTS ANALYTICS;
USE SCHEMA ANALYTICS;

-- 顧客フィードバックテーブル
CREATE OR REPLACE TABLE customer_feedback (
    feedback_id INT,
    customer_name STRING,
    product_category STRING,
    feedback_text STRING,
    rating INT,
    feedback_date DATE,
    language STRING
);

-- サンプルデータの挿入
INSERT INTO customer_feedback VALUES
(1, '田中一郎', 'ノートPC', '新しいノートPCを購入しましたが、バッテリーの持ちが思ったより短いです。それ以外は満足しています。', 4, '2025-06-20', 'ja'),
(2, 'Smith John', 'Monitor', 'The display quality is excellent! Colors are vibrant and text is crisp. Best purchase this year.', 5, '2025-06-21', 'en'),
(3, '佐藤花子', 'キーボード', 'タイピングの感触が素晴らしく、長時間の作業でも疲れません。ただし、キーボードの光が少し眩しいかもしれません。', 4, '2025-06-22', 'ja'),
(4, 'Garcia Maria', 'Mouse', 'The mouse stopped working after just 2 weeks. Very disappointed with the quality. Will not recommend.', 2, '2025-06-23', 'en'),
(5, '鈴木太郎', 'ヘッドセット', '音質が非常に良く、ノイズキャンセリング機能も完璧です。価格は少し高めですが、品質を考えると妥当だと思います。', 5, '2025-06-24', 'ja'),
(6, 'Lee Wei', 'Tablet', '平板电脑的性能很好，但是充电时间太长了。希望下一代产品能改进这个问题。', 3, '2025-06-25', 'zh'),
(7, '高橋美咲', 'スマートフォン', 'カメラの画質が期待していたより良くありませんでした。特に夜間撮影時のノイズが気になります。', 3, '2025-06-26', 'ja');

-- 製品情報テーブル
CREATE OR REPLACE TABLE products (
    product_id STRING,
    product_name STRING,
    category STRING,
    description STRING,
    price DECIMAL(10,2)
);

INSERT INTO products VALUES
('P001', 'ThinkPad X1 Carbon', 'ノートPC', '軽量で高性能なビジネス向けノートパソコン', 180000.00),
('P002', 'UltraWide Monitor 34"', 'Monitor', '高解像度34インチウルトラワイドモニター', 65000.00),
('P003', 'Mechanical Keyboard Pro', 'キーボード', 'Cherry MXスイッチ搭載メカニカルキーボード', 15000.00),
('P004', 'Wireless Mouse Elite', 'Mouse', '高精度ワイヤレスゲーミングマウス', 8000.00),
('P005', 'Noise Cancelling Headset', 'ヘッドセット', 'アクティブノイズキャンセリング搭載ヘッドセット', 25000.00),
('P006', 'Android Tablet Pro', 'Tablet', '12インチ高性能Androidタブレット', 45000.00),
('P007', 'Smartphone Camera Plus', 'スマートフォン', '高性能カメラ搭載スマートフォン', 95000.00);
```

### 演習3.2: 多言語フィードバック分析

```sql
-- 多言語フィードバックの感情分析
SELECT 
    feedback_id,
    customer_name,
    language,
    LEFT(feedback_text, 50) || '...' AS feedback_preview,
    
    -- 統一された感情分析（日本語で出力）
    AI_COMPLETE(
        'claude-3-5-sonnet',
        'この顧客フィードバックの感情を「ポジティブ」「ネガティブ」「ニュートラル」で分類し、理由も簡潔に説明してください。フィードバック: ' || feedback_text,
        {'max_tokens': 100, 'temperature': 0.2}
    ) AS sentiment_analysis,
    
    -- 多言語翻訳（英語以外は英語に翻訳）
    CASE 
        WHEN language != 'en' THEN
            AI_COMPLETE(
                'mistral-large2',
                'Translate the following text to English: ' || feedback_text,
                {'max_tokens': 200}
            )
        ELSE feedback_text
    END AS english_translation

FROM customer_feedback
ORDER BY feedback_date DESC;
```

**✅ 分析ポイント:**
- [ ] 各言語での感情分析の精度を確認
- [ ] 翻訳の品質を評価
- [ ] 統一されたフォーマットでの出力を確認

### 演習3.3: 製品改善提案の抽出

```sql
-- 製品カテゴリ別の改善提案抽出
SELECT 
    product_category,
    COUNT(*) AS feedback_count,
    AVG(rating) AS avg_rating,
    
    -- 具体的な改善提案の抽出
    AI_AGG(
        feedback_text,
        'これらの顧客フィードバックから、製品改善のための具体的で実行可能な提案を3つ抽出してください。優先度の高い順に番号を付けて回答してください。'
    ) AS improvement_suggestions,
    
    -- ポジティブな評価ポイントの要約
    AI_AGG(
        CASE WHEN rating >= 4 THEN feedback_text ELSE NULL END,
        'ポジティブなフィードバックから、この製品カテゴリの強みを3つ抽出してください。'
    ) AS positive_aspects

FROM customer_feedback
GROUP BY product_category
HAVING COUNT(*) >= 2  -- 十分なフィードバック数があるカテゴリのみ
ORDER BY avg_rating DESC;
```

**✅ 分析ポイント:**
- [ ] AI_AGG関数が複数行のテキストを適切に集約しているか
- [ ] 実用的な改善提案が抽出されているか
- [ ] ポジティブな評価の要約が適切か

---

## セクション4: 高度な機能とユースケース

### 演習4.1: AI_CLASSIFYによる多次元分析

```sql
-- フィードバックの多面的分類
SELECT 
    feedback_id,
    customer_name,
    feedback_text,
    rating,
    
    -- 感情分類
    AI_CLASSIFY(
        feedback_text,
        ['非常にポジティブ', 'ポジティブ', 'ニュートラル', 'ネガティブ', '非常にネガティブ']
    ) AS sentiment_category,
    
    -- トピック分類（マルチラベル）
    AI_CLASSIFY(
        feedback_text,
        ['性能', '価格', 'デザイン', '使いやすさ', '品質', '配送', 'サポート'],
        {'multi_label': true}
    ) AS topics,
    
    -- 緊急度分類
    AI_CLASSIFY(
        feedback_text,
        ['即座に対応が必要', '1週間以内に対応', '通常対応', '対応不要']
    ) AS urgency_level

FROM customer_feedback
WHERE language = 'ja'  -- 日本語フィードバックのみ
ORDER BY feedback_id;
```

### 演習4.2: AI_FILTERによる条件付き分析

```sql
-- 問題のあるフィードバックのフィルタリングと分析
WITH problematic_feedback AS (
    SELECT *
    FROM customer_feedback
    WHERE AI_FILTER('このフィードバックは製品の問題や不満を示していますか？: ' || feedback_text)
)
SELECT 
    product_category,
    COUNT(*) AS issue_count,
    
    -- 共通する問題点の抽出
    AI_AGG(
        feedback_text,
        '共通する問題点やパターンを特定し、根本原因と解決策を提案してください。'
    ) AS common_issues_and_solutions,
    
    -- 顧客への返信テンプレート
    AI_COMPLETE(
        'claude-3-5-sonnet',
        '以下の問題を抱えた顧客への謝罪と解決策を含む返信テンプレートを作成してください:\n\n' ||
        (SELECT LISTAGG(feedback_text, '\n---\n') WITHIN GROUP (ORDER BY feedback_id) 
         FROM problematic_feedback p 
         WHERE p.product_category = pf.product_category),
        {'max_tokens': 300}
    ) AS response_template
    
FROM problematic_feedback pf
GROUP BY product_category;
```

### 演習4.3: AI_SIMILARITYによる類似性分析

```sql
-- 基準フィードバックとの類似度分析
WITH reference_feedback AS (
    SELECT feedback_text as reference_text
    FROM customer_feedback 
    WHERE feedback_id = 1  -- 基準となるフィードバック
)
SELECT 
    cf.feedback_id,
    cf.customer_name,
    cf.product_category,
    LEFT(cf.feedback_text, 100) || '...' AS feedback_preview,
    
    -- 類似度スコア
    AI_SIMILARITY(
        cf.feedback_text,
        (SELECT reference_text FROM reference_feedback)
    ) AS similarity_score,
    
    -- 類似度の解釈
    CASE 
        WHEN AI_SIMILARITY(cf.feedback_text, (SELECT reference_text FROM reference_feedback)) > 0.8 
        THEN '非常に類似'
        WHEN AI_SIMILARITY(cf.feedback_text, (SELECT reference_text FROM reference_feedback)) > 0.6 
        THEN '類似'
        WHEN AI_SIMILARITY(cf.feedback_text, (SELECT reference_text FROM reference_feedback)) > 0.4 
        THEN 'やや類似'
        ELSE '類似性低'
    END AS similarity_level

FROM customer_feedback cf
WHERE cf.feedback_id != 1
ORDER BY similarity_score DESC;
```

---

## セクション5: パフォーマンスとコスト最適化

### 演習5.1: トークン数分析とコスト見積もり

```sql
-- フィードバックのトークン数分析
WITH token_analysis AS (
    SELECT 
        feedback_id,
        feedback_text,
        LENGTH(feedback_text) AS char_count,
        COUNT_TOKENS('llama3.1-70b', feedback_text) AS token_count,
        
        -- 処理コストの見積もり（概算）
        COUNT_TOKENS('llama3.1-70b', feedback_text) * 0.0002 AS estimated_cost_credits,
        
        -- コストカテゴリの分類
        CASE 
            WHEN COUNT_TOKENS('llama3.1-70b', feedback_text) > 500 THEN '高コスト'
            WHEN COUNT_TOKENS('llama3.1-70b', feedback_text) > 200 THEN '中コスト'
            ELSE '低コスト'
        END AS cost_category
        
    FROM customer_feedback
)
SELECT 
    cost_category,
    COUNT(*) AS record_count,
    MIN(token_count) AS min_tokens,
    MAX(token_count) AS max_tokens,
    AVG(token_count) AS avg_tokens,
    SUM(estimated_cost_credits) AS total_estimated_cost
FROM token_analysis
GROUP BY cost_category
ORDER BY 
    CASE cost_category 
        WHEN '高コスト' THEN 1 
        WHEN '中コスト' THEN 2 
        ELSE 3 
    END;
```

### 演習5.2: 効率的なバッチ処理

```sql
-- 大量データの効率的な処理方法
WITH batched_processing AS (
    SELECT 
        feedback_id,
        feedback_text,
        -- バッチ番号の割り当て（5件ずつのバッチ）
        CEIL(ROW_NUMBER() OVER (ORDER BY feedback_id) / 5.0) AS batch_number
    FROM customer_feedback
)
SELECT 
    batch_number,
    COUNT(*) AS batch_size,
    
    -- バッチごとの集約分析（効率的）
    AI_AGG(
        feedback_text,
        'このバッチのフィードバックの主要テーマを要約してください（50語以内）'
    ) AS batch_summary,
    
    -- 推定処理時間とコスト
    SUM(COUNT_TOKENS('llama3.1-70b', feedback_text)) AS total_tokens,
    SUM(COUNT_TOKENS('llama3.1-70b', feedback_text)) * 0.0002 AS estimated_cost

FROM batched_processing
WHERE batch_number = 1  -- 最初のバッチのみ実行（デモ用）
GROUP BY batch_number;
```

### 演習5.3: エラーハンドリングの実装

```sql
-- 堅牢なエラーハンドリング付きクエリ
SELECT 
    feedback_id,
    customer_name,
    feedback_text,
    
    -- 安全な感情分析（TRY_COMPLETE使用）
    COALESCE(
        TRY_COMPLETE(
            'llama3.1-70b',
            '感情分析（ポジティブ/ネガティブ/ニュートラル）: ' || feedback_text,
            {'max_tokens': 50, 'temperature': 0.1}
        ),
        '分析失敗 - 手動確認が必要'
    ) AS safe_sentiment,
    
    -- トークン数チェック付き処理
    CASE 
        WHEN COUNT_TOKENS('claude-3-5-sonnet', feedback_text) > 1000 THEN
            'テキストが長すぎるため省略版で分析: ' || 
            AI_COMPLETE(
                'claude-3-5-sonnet',
                '簡潔に感情分析: ' || LEFT(feedback_text, 500),
                {'max_tokens': 30}
            )
        ELSE
            AI_COMPLETE(
                'claude-3-5-sonnet',
                '詳細な感情分析: ' || feedback_text,
                {'max_tokens': 100}
            )
    END AS adaptive_analysis

FROM customer_feedback
ORDER BY feedback_id;
```

---

## セクション6: 実世界のユースケース演習

### 演習6.1: 顧客サポートダッシュボード

```sql
-- 総合的な顧客サポートダッシュボード用クエリ
CREATE OR REPLACE VIEW customer_support_dashboard AS
WITH daily_metrics AS (
    SELECT 
        DATE_TRUNC('day', feedback_date) AS report_date,
        COUNT(*) AS total_feedback,
        AVG(rating) AS avg_rating,
        
        -- 感情分布
        SUM(CASE WHEN AI_CLASSIFY(feedback_text, ['ポジティブ', 'ネガティブ', 'ニュートラル']) LIKE '%ポジティブ%' THEN 1 ELSE 0 END) AS positive_count,
        SUM(CASE WHEN AI_CLASSIFY(feedback_text, ['ポジティブ', 'ネガティブ', 'ニュートラル']) LIKE '%ネガティブ%' THEN 1 ELSE 0 END) AS negative_count,
        
        -- 緊急対応が必要な件数
        SUM(CASE WHEN AI_FILTER('このフィードバックは緊急対応が必要ですか？: ' || feedback_text) THEN 1 ELSE 0 END) AS urgent_count,
        
        -- 主要な問題点とトレンド
        AI_AGG(
            feedback_text,
            'この日の主要な問題点とトレンドを3つの箇条書きで要約してください。'
        ) AS daily_insights
        
    FROM customer_feedback
    GROUP BY DATE_TRUNC('day', feedback_date)
)
SELECT 
    report_date,
    total_feedback,
    ROUND(avg_rating, 2) AS avg_rating,
    positive_count,
    negative_count,
    urgent_count,
    ROUND(positive_count::FLOAT / total_feedback * 100, 1) AS positive_percentage,
    daily_insights
FROM daily_metrics
ORDER BY report_date DESC;

-- ダッシュボードの確認
SELECT * FROM customer_support_dashboard;
```

### 演習6.2: 競合製品分析

```sql
-- 競合製品との比較分析
WITH competitive_analysis AS (
    SELECT 
        product_category,
        
        -- 自社製品の強み
        AI_AGG(
            CASE WHEN rating >= 4 THEN feedback_text ELSE NULL END,
            '顧客が評価している当社製品の独自の強みと差別化要因を特定してください。'
        ) AS our_strengths,
        
        -- 改善すべき領域
        AI_AGG(
            CASE WHEN rating <= 3 THEN feedback_text ELSE NULL END,
            '競合他社との比較で改善すべき具体的な領域と優先順位を示してください。'
        ) AS improvement_areas,
        
        -- 市場ポジショニング提案
        AI_COMPLETE(
            'claude-3-5-sonnet',
            '以下の顧客フィードバックに基づいて、' || product_category || 'カテゴリでの最適な市場ポジショニング戦略を提案してください:\n\n' ||
            (SELECT LISTAGG(feedback_text, '\n') WITHIN GROUP (ORDER BY rating DESC) 
             FROM customer_feedback cf2 
             WHERE cf2.product_category = cf.product_category),
            {'max_tokens': 250}
        ) AS positioning_strategy
        
    FROM customer_feedback cf
    GROUP BY product_category
)
SELECT * FROM competitive_analysis;
```

---

## セクション7: 検証とテスト

### 演習7.1: AI出力の品質検証

```sql
-- AI分析結果の一貫性テスト
WITH consistency_test AS (
    SELECT 
        feedback_id,
        feedback_text,
        
        -- 同じプロンプトを3回実行して一貫性を確認
        AI_COMPLETE('llama3.1-70b', '感情分析（ポジティブ/ネガティブ/ニュートラル）: ' || feedback_text, {'temperature': 0.1}) AS analysis_1,
        AI_COMPLETE('llama3.1-70b', '感情分析（ポジティブ/ネガティブ/ニュートラル）: ' || feedback_text, {'temperature': 0.1}) AS analysis_2,
        AI_COMPLETE('llama3.1-70b', '感情分析（ポジティブ/ネガティブ/ニュートラル）: ' || feedback_text, {'temperature': 0.1}) AS analysis_3
        
    FROM customer_feedback
    WHERE feedback_id <= 3  -- 少数のサンプルでテスト
)
SELECT 
    feedback_id,
    analysis_1,
    analysis_2,
    analysis_3,
    
    -- 一貫性の評価
    CASE 
        WHEN analysis_1 = analysis_2 AND analysis_2 = analysis_3 THEN '完全一致'
        WHEN (analysis_1 LIKE '%ポジティブ%' AND analysis_2 LIKE '%ポジティブ%' AND analysis_3 LIKE '%ポジティブ%') OR
             (analysis_1 LIKE '%ネガティブ%' AND analysis_2 LIKE '%ネガティブ%' AND analysis_3 LIKE '%ネガティブ%') OR
             (analysis_1 LIKE '%ニュートラル%' AND analysis_2 LIKE '%ニュートラル%' AND analysis_3 LIKE '%ニュートラル%') THEN '概ね一致'
        ELSE '不一致'
    END AS consistency_level
    
FROM consistency_test;
```

### 演習7.2: 使用量とコストの監視

```sql
-- リアルタイム使用量監視
SELECT 
    DATE_TRUNC('hour', start_time) AS hour_bucket,
    function_name,
    model_name,
    COUNT(*) AS call_count,
    SUM(input_tokens) AS total_input_tokens,
    SUM(output_tokens) AS total_output_tokens,
    SUM(credits_used) AS total_credits,
    AVG(DATEDIFF('milliseconds', start_time, end_time)) AS avg_response_time_ms
FROM SNOWFLAKE.ACCOUNT_USAGE.CORTEX_FUNCTIONS_USAGE_HISTORY
WHERE start_time >= CURRENT_TIMESTAMP - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', start_time), function_name, model_name
ORDER BY hour_bucket DESC, total_credits DESC;
```

---

## セクション8: 最終プロジェクト

### 最終課題: 総合的なビジネスインテリジェンスシステム

あなたのタスクは、顧客フィードバックデータを使用して、経営陣向けの包括的なビジネスインテリジェンスレポートを作成することです。

#### 要件:
1. **多言語対応**: 全ての言語のフィードバックを統一的に分析
2. **リアルタイム監視**: 緊急対応が必要な問題の自動検出
3. **予測的洞察**: 将来のトレンドと潜在的問題の予測
4. **実行可能な推奨事項**: 具体的なアクションプランの提案

#### テンプレート:
```sql
-- あなたのソリューションをここに実装してください
CREATE OR REPLACE VIEW executive_intelligence_report AS
WITH 
-- Step 1: データの前処理と統一化

-- Step 2: 多次元分析

-- Step 3: トレンド分析と予測

-- Step 4: 実行可能な推奨事項の生成

SELECT 
    -- レポートの最終結果をここに定義
;

-- レポートの実行
SELECT * FROM executive_intelligence_report;
```

---

## ワークショップ完了チェックリスト

### 技術的スキル
- [ ] AI_COMPLETE関数の基本的な使用方法をマスター
- [ ] 会話形式とパラメータ調整を適切に実行
- [ ] AI_CLASSIFY、AI_FILTER、AI_AGGの使い分けを理解
- [ ] エラーハンドリングとTRY_COMPLETEの活用
- [ ] トークン数管理とコスト最適化を実践

### ビジネス応用
- [ ] 実際のビジネスデータでAI分析を実行
- [ ] 多言語データの統一的処理を実現
- [ ] 実行可能なビジネス洞察を抽出
- [ ] ダッシュボードとレポートの自動化を構築

### 運用・監視
- [ ] 使用量とコストの監視体制を構築
- [ ] パフォーマンス最適化を実施
- [ ] 品質保証とテスト手法を確立

### 次のステップ
- [ ] 組織内でのユースケース特定
- [ ] 本格運用に向けたガバナンス設計
- [ ] 継続的な改善プロセスの確立

---

## 追加リソース

### 参考ドキュメント
- [Snowflake Cortex AISQL公式ドキュメント](https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql)
- [コスト管理ガイド](https://docs.snowflake.com/en/user-guide/cost-understanding)
- [ベストプラクティス集](https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions#performance-considerations)

### コミュニティとサポート
- Snowflake Community Forums
- Snowflake University
- パートナーエコシステム

---

**🎉 ワークショップ完了おめでとうございます！**

このワークショップで習得したスキルを活用して、あなたの組織でのAI活用を推進してください。継続的な学習と実践により、さらに高度なAI分析能力を身につけることができます。