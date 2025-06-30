# 2025年6月25日 Snowflake SQLクイズ
## Cortex AISQL - AI_COMPLETE関数

### 問題

以下のシナリオを読んで、**AI_COMPLETE関数**の使い方に関する問題に答えてください。

**シナリオ：**
あなたは、顧客からの問い合わせメールを分析するシステムを構築しています。`CUSTOMER_EMAILS`テーブルには以下のカラムがあります：
- `EMAIL_ID` (整数)
- `CUSTOMER_NAME` (文字列)
- `EMAIL_CONTENT` (文字列)
- `RECEIVED_DATE` (日付)

このテーブルのメール内容を分析して、各メールの感情（ポジティブ、ネガティブ、ニュートラル）を判定したいと考えています。

**質問1：基本的な使用方法**
`AI_COMPLETE`関数を使用して、`EMAIL_CONTENT`カラムの内容から感情を分析するSQLクエリを書いてください。使用するモデルは`llama3.1-70b`とし、結果は「ポジティブ」「ネガティブ」「ニュートラル」のいずれかで返すようにしてください。

**質問2：パラメータ設定**
上記のクエリを改良して、以下の条件を満たすようにしてください：
- 出力トークン数を最大50トークンに制限
- 温度パラメータ（temperature）を0.3に設定
- 結果をJSON形式で出力

**質問3：エラー処理**
`AI_COMPLETE`関数でエラーが発生した場合にNULLを返すようにするには、どのような関数を代わりに使用すべきでしょうか？

**質問4：コスト考慮**
`AI_COMPLETE`関数を実行する際の推奨ウェアハウスサイズは何ですか？その理由も説明してください。

### 解答

**質問1の解答：**
```sql
SELECT 
    EMAIL_ID,
    CUSTOMER_NAME,
    EMAIL_CONTENT,
    AI_COMPLETE(
        'llama3.1-70b',
        'この顧客メールの感情を分析してください。「ポジティブ」「ネガティブ」「ニュートラル」のいずれかで回答してください。メール内容: ' || EMAIL_CONTENT
    ) AS sentiment
FROM CUSTOMER_EMAILS;
```

**質問2の解答：**
```sql
SELECT 
    EMAIL_ID,
    CUSTOMER_NAME,
    EMAIL_CONTENT,
    AI_COMPLETE(
        'llama3.1-70b',
        'この顧客メールの感情を分析して、JSONフォーマットで結果を返してください。形式: {"sentiment": "ポジティブ/ネガティブ/ニュートラル", "confidence": "高/中/低"}。メール内容: ' || EMAIL_CONTENT,
        {
            'max_tokens': 50,
            'temperature': 0.3
        }
    ) AS sentiment_analysis
FROM CUSTOMER_EMAILS;
```

**質問3の解答：**
`TRY_COMPLETE`関数を使用します。この関数は、`AI_COMPLETE`関数がエラーを返す代わりに、エラーが発生した場合にNULLを返します。

```sql
SELECT 
    EMAIL_ID,
    TRY_COMPLETE(
        'llama3.1-70b',
        'この顧客メールの感情を分析してください: ' || EMAIL_CONTENT
    ) AS sentiment
FROM CUSTOMER_EMAILS;
```

**質問4の解答：**
推奨ウェアハウスサイズは**MEDIUM以下**です。

理由：
- より大きなウェアハウス（LARGE、XLARGEなど）を使用してもパフォーマンスは向上しません
- 不必要なコストが発生する可能性があります
- スロットリング（制限）のリスクが高くなる可能性があります
- AI_COMPLETE関数自体はSnowflakeで完全にホストされているため、ウェアハウスサイズよりもモデルの処理能力に依存します

### 補足情報

**利用可能なモデル例：**
- `claude-3-5-sonnet` - 高性能な推論能力
- `llama3.1-70b` - バランスの取れた性能とコスト
- `mistral-large2` - 多言語サポートに優れる
- `snowflake-arctic` - Snowflake独自のエンタープライズ向けモデル

**コスト管理：**
- 処理されたトークン数に基づいて課金されます
- 入力と出力の両方のトークンがカウントされます
- `COUNT_TOKENS`関数でトークン数を事前に確認可能です

**権限要件：**
- `SNOWFLAKE.CORTEX_USER`データベースロールが必要
- デフォルトでPUBLICロールに付与されています