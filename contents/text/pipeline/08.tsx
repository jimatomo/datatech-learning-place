import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CodeBlock } from "@/components/ui/code-block"
import { ListOrderedIcon, TrendingUpIcon, ShieldCheckIcon } from "lucide-react"


export default function TextContents() {
  return (
    <div className="w-full">
      <Alert className="bg-red-50 dark:bg-red-950 border-l-4 border-red-400 mb-6">
        <AlertTitle className="font-bold text-red-800 dark:text-red-200">
          まだAIが作った適当なものなので後でガッチリ変えていく
        </AlertTitle>
      </Alert>


      <h1 className="text-2xl font-bold mb-4">Chapter 8: モデルの改善と最適化</h1>

      <p className="mb-4">
        この章では、作成したdbtモデルの性能改善、テストの追加、ドキュメント化、
        監視・運用面での最適化について学習します。プロダクション環境で運用するための実践的な技術を身につけます。
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">主な学習内容</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>パフォーマンス最適化（インデックス、クラスタリング）</li>
          <li>データ品質テストの実装</li>
          <li>包括的なドキュメント作成</li>
          <li>データリネージの可視化</li>
          <li>インクリメンタルモデルの実装</li>
          <li>マクロとカスタム関数の活用</li>
          <li>監視とアラートの設定</li>
          <li>パフォーマンス監視とチューニング</li>
        </ul>
      </div>

      <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mb-6">
        <TrendingUpIcon className="h-5 w-5 text-blue-600" />
        <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">データプロダクトの運用成熟度</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
          データプロダクトの運用成熟度は、テスト・ドキュメント・監視の充実度で決まります。
          この章で学ぶ技術により、信頼性が高く、保守性に優れた
          プロダクションレディなデータパイプラインを構築できます。
        </AlertDescription>
      </Alert>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順1: パフォーマンス最適化</h3>
        <p className="mb-3">
          大量のデータを効率的に処理するための最適化技術を実装します。
        </p>

        <CodeBlock
          code={`-- クラスタリングキーの設定
-- models/marts/core/customer_orders.sql の更新
{{ config(
    materialized='table',
    cluster_by=['customer_id', 'last_order_date']
) }}

WITH customer_order_summary AS (
    SELECT 
        c.customer_id,
        c.first_name,
        c.last_name,
        c.email,
        c.city,
        c.state,
        COUNT(DISTINCT o.order_id) AS total_orders,
        SUM(o.total_amount) AS total_spent,
        AVG(o.total_amount) AS avg_order_value,
        MIN(o.order_date) AS first_order_date,
        MAX(o.order_date) AS last_order_date,
        DATEDIFF('day', MIN(o.order_date), MAX(o.order_date)) AS customer_lifetime_days
    FROM {{ ref('stg_customers') }} c
    LEFT JOIN {{ ref('stg_orders') }} o ON c.customer_id = o.customer_id
    GROUP BY 1, 2, 3, 4, 5, 6
)

SELECT 
    *,
    CASE 
        WHEN total_orders >= 3 THEN 'High Value'
        WHEN total_orders >= 2 THEN 'Medium Value'
        ELSE 'Low Value'
    END AS customer_segment
FROM customer_order_summary`}
          title="クラスタリングキー設定"
          showLineNumbers={true}
          maxLines={30}
          maxWidth="max-w-none"
        />

        <CodeBlock
          code={`-- インクリメンタルモデルの実装
-- models/marts/finance/daily_sales_incremental.sql
{{ config(
    materialized='incremental',
    unique_key='order_date',
    on_schema_change='append_new_columns'
) }}

SELECT 
    o.order_date,
    COUNT(DISTINCT o.order_id) AS total_orders,
    COUNT(DISTINCT o.customer_id) AS unique_customers,
    SUM(o.total_amount) AS daily_revenue,
    AVG(o.total_amount) AS avg_order_value
FROM {{ ref('stg_orders') }} o
WHERE o.status = 'completed'
{% if is_incremental() %}
  -- インクリメンタル実行時は、過去7日分のデータのみを更新
  AND o.order_date >= (SELECT MAX(order_date) - INTERVAL '7 days' FROM {{ this }})
{% endif %}
GROUP BY o.order_date
ORDER BY o.order_date`}
          title="インクリメンタルモデル"
          showLineNumbers={true}
          maxLines={20}
          maxWidth="max-w-none"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順2: 包括的なデータ品質テスト</h3>
        <p className="mb-3">
          データ品質を保証するための詳細なテストスイートを実装します。
        </p>

        <CodeBlock
          code={`# models/staging/ecommerce/_sources.yml の拡張
version: 2

sources:
  - name: ecommerce
    description: "Eコマースの生データ"
    database: raw_data
    schema: ecommerce
    tables:
      - name: customers
        description: "顧客マスタ"
        columns:
          - name: customer_id
            description: "顧客ID"
            tests:
              - unique
              - not_null
          - name: email
            description: "メールアドレス"
            tests:
              - not_null
              - unique
              - dbt_utils.format_email
          - name: created_at
            description: "作成日時"
            tests:
              - not_null
              - dbt_expectations.expect_column_values_to_be_of_type:
                  column_type: timestamp
      
      - name: orders
        description: "注文テーブル"
        columns:
          - name: order_id
            description: "注文ID"
            tests:
              - unique
              - not_null
          - name: customer_id
            description: "顧客ID"
            tests:
              - not_null
              - relationships:
                  to: source('ecommerce', 'customers')
                  field: customer_id
          - name: total_amount
            description: "注文合計金額"
            tests:
              - not_null
              - dbt_expectations.expect_column_values_to_be_between:
                  min_value: 0
                  max_value: 10000
          - name: status
            description: "注文ステータス"
            tests:
              - not_null
              - accepted_values:
                  values: ['pending', 'processing', 'completed', 'cancelled']`}
          title="拡張データ品質テスト"
          showLineNumbers={true}
          maxLines={40}
          maxWidth="max-w-none"
        />

        <CodeBlock
          code={`# カスタムテストの作成
# tests/assert_positive_revenue.sql
SELECT *
FROM {{ ref('daily_sales') }}
WHERE daily_revenue <= 0

# tests/assert_customer_order_consistency.sql
-- 顧客の注文数と注文詳細の整合性チェック
WITH order_counts AS (
    SELECT 
        customer_id,
        COUNT(*) AS order_count_from_orders
    FROM {{ ref('stg_orders') }}
    GROUP BY customer_id
),
customer_summary_counts AS (
    SELECT 
        customer_id,
        total_orders AS order_count_from_summary
    FROM {{ ref('customer_orders') }}
)

SELECT 
    o.customer_id,
    o.order_count_from_orders,
    c.order_count_from_summary
FROM order_counts o
FULL OUTER JOIN customer_summary_counts c
    ON o.customer_id = c.customer_id
WHERE o.order_count_from_orders != c.order_count_from_summary
   OR o.order_count_from_orders IS NULL 
   OR c.order_count_from_summary IS NULL`}
          title="カスタムテスト実装"
          showLineNumbers={true}
          maxLines={30}
          maxWidth="max-w-none"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順3: 包括的なドキュメント作成</h3>
        <p className="mb-3">
          モデルの理解と保守性を向上させるための詳細なドキュメントを作成します。
        </p>

        <CodeBlock
          code={`# models/marts/core/_models.yml
version: 2

models:
  - name: customer_orders
    description: |
      顧客別の注文サマリテーブル。
      各顧客の注文履歴、売上、行動パターンを分析するためのマートテーブル。
      マーケティング施策の効果測定や顧客セグメンテーションに使用。
    
    columns:
      - name: customer_id
        description: "顧客の一意識別子"
        tests:
          - unique
          - not_null
      
      - name: total_orders
        description: "顧客の総注文回数"
        tests:
          - not_null
          - dbt_expectations.expect_column_values_to_be_between:
              min_value: 0
              max_value: 1000
      
      - name: total_spent
        description: "顧客の総購入金額（円）"
        tests:
          - not_null
          - dbt_expectations.expect_column_values_to_be_between:
              min_value: 0
      
      - name: customer_segment
        description: |
          顧客セグメント分類:
          - High Value: 3回以上の注文
          - Medium Value: 2回の注文  
          - Low Value: 1回の注文
        tests:
          - not_null
          - accepted_values:
              values: ['High Value', 'Medium Value', 'Low Value']

  - name: product_performance
    description: |
      商品別のパフォーマンス分析テーブル。
      各商品の売上実績、収益性、人気度を分析するためのマートテーブル。
      商品戦略や在庫管理の意思決定に使用。
    
    columns:
      - name: product_id
        description: "商品の一意識別子"
        tests:
          - unique
          - not_null
      
      - name: total_revenue
        description: "商品の総売上金額"
        tests:
          - not_null
          - dbt_expectations.expect_column_values_to_be_between:
              min_value: 0
      
      - name: margin_percent
        description: "商品の利益率（パーセント）"
        tests:
          - not_null
          - dbt_expectations.expect_column_values_to_be_between:
              min_value: 0
              max_value: 100`}
          title="モデルドキュメント定義"
          showLineNumbers={true}
          maxLines={45}
          maxWidth="max-w-none"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順4: マクロとカスタム関数の活用</h3>
        <p className="mb-3">
          再利用可能なロジックをマクロとして実装し、コードの重複を削減します。
        </p>

        <CodeBlock
          code={`# macros/get_customer_segment.sql
{% macro get_customer_segment(order_count_column) %}
    CASE 
        WHEN {{ order_count_column }} >= 3 THEN 'High Value'
        WHEN {{ order_count_column }} >= 2 THEN 'Medium Value'
        ELSE 'Low Value'
    END
{% endmacro %}

# macros/format_currency.sql
{% macro format_currency(amount_column, currency='JPY') %}
    CASE 
        WHEN {{ currency }} = 'JPY' THEN CONCAT('¥', FORMAT({{ amount_column }}, 0))
        WHEN {{ currency }} = 'USD' THEN CONCAT('$', FORMAT({{ amount_column }}, 2))
        ELSE FORMAT({{ amount_column }}, 2)
    END
{% endmacro %}

# macros/safe_divide.sql
{% macro safe_divide(numerator, denominator) %}
    CASE 
        WHEN {{ denominator }} = 0 THEN NULL
        ELSE {{ numerator }} / {{ denominator }}
    END
{% endmacro %}

# macros/get_date_spine.sql
{% macro get_date_spine(start_date, end_date) %}
    WITH date_spine AS (
        SELECT 
            DATEADD('day', seq4(), '{{ start_date }}') AS date_day
        FROM TABLE(GENERATOR(ROWCOUNT => DATEDIFF('day', '{{ start_date }}', '{{ end_date }}') + 1))
    )
    SELECT date_day FROM date_spine
{% endmacro %}`}
          title="カスタムマクロ実装"
          showLineNumbers={true}
          maxLines={30}
          maxWidth="max-w-none"
        />

        <CodeBlock
          code={`# マクロを使用したモデルの改善
# models/marts/core/customer_orders_improved.sql
{{ config(materialized='table') }}

WITH customer_order_summary AS (
    SELECT 
        c.customer_id,
        c.first_name,
        c.last_name,
        c.email,
        c.city,
        c.state,
        COUNT(DISTINCT o.order_id) AS total_orders,
        SUM(o.total_amount) AS total_spent,
        {{ safe_divide('SUM(o.total_amount)', 'COUNT(DISTINCT o.order_id)') }} AS avg_order_value,
        MIN(o.order_date) AS first_order_date,
        MAX(o.order_date) AS last_order_date,
        DATEDIFF('day', MIN(o.order_date), MAX(o.order_date)) AS customer_lifetime_days
    FROM {{ ref('stg_customers') }} c
    LEFT JOIN {{ ref('stg_orders') }} o ON c.customer_id = o.customer_id
    GROUP BY 1, 2, 3, 4, 5, 6
)

SELECT 
    *,
    {{ get_customer_segment('total_orders') }} AS customer_segment,
    {{ format_currency('total_spent') }} AS total_spent_formatted,
    {{ format_currency('avg_order_value') }} AS avg_order_value_formatted
FROM customer_order_summary`}
          title="マクロ活用例"
          showLineNumbers={true}
          maxLines={25}
          maxWidth="max-w-none"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順5: 監視とアラートの設定</h3>
        <p className="mb-3">
          データパイプラインの健全性を監視し、問題を早期発見するためのアラート機能を実装します。
        </p>

        <CodeBlock
          code={`# models/monitoring/data_quality_metrics.sql
{{ config(materialized='table') }}

WITH quality_metrics AS (
    -- レコード数のモニタリング
    SELECT 
        'customers' AS table_name,
        COUNT(*) AS record_count,
        COUNT(*) FILTER (WHERE email IS NULL) AS null_email_count,
        COUNT(DISTINCT email) AS unique_email_count,
        CURRENT_TIMESTAMP() AS measured_at
    FROM {{ ref('stg_customers') }}
    
    UNION ALL
    
    SELECT 
        'orders' AS table_name,
        COUNT(*) AS record_count,
        COUNT(*) FILTER (WHERE total_amount <= 0) AS invalid_amount_count,
        COUNT(DISTINCT customer_id) AS unique_customer_count,
        CURRENT_TIMESTAMP() AS measured_at
    FROM {{ ref('stg_orders') }}
),

quality_alerts AS (
    SELECT 
        *,
        CASE 
            WHEN table_name = 'customers' AND record_count < 100 THEN 'ALERT: Low customer count'
            WHEN table_name = 'customers' AND null_email_count > 0 THEN 'ALERT: Null emails detected'
            WHEN table_name = 'orders' AND invalid_amount_count > 0 THEN 'ALERT: Invalid order amounts'
            ELSE 'OK'
        END AS quality_status
    FROM quality_metrics
)

SELECT * FROM quality_alerts

# models/monitoring/pipeline_health.sql
{{ config(materialized='view') }}

SELECT 
    'dbt_run' AS check_type,
    CASE 
        WHEN COUNT(*) FROM {{ ref('customer_orders') }} > 0 THEN 'HEALTHY'
        ELSE 'FAILED'
    END AS status,
    CURRENT_TIMESTAMP() AS last_checked
FROM {{ ref('customer_orders') }}

UNION ALL

SELECT 
    'data_freshness' AS check_type,
    CASE 
        WHEN MAX(order_date) >= CURRENT_DATE() - INTERVAL '7 days' THEN 'HEALTHY'
        ELSE 'STALE'
    END AS status,
    CURRENT_TIMESTAMP() AS last_checked
FROM {{ ref('stg_orders') }}`}
          title="監視メトリクス実装"
          showLineNumbers={true}
          maxLines={40}
          maxWidth="max-w-none"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順6: パフォーマンス監視とチューニング</h3>
        <p className="mb-3">
          クエリの実行時間とリソース使用量を監視し、最適化を行います。
        </p>

        <CodeBlock
          code={`# dbt実行時のパフォーマンス監視
dbt run --vars '{"enable_profiling": true}'

# 特定のモデルの詳細分析
dbt run --select customer_orders --profiles-dir ~/.dbt --profile snowflake_profile

# クエリプランの確認（Snowflakeで実行）
EXPLAIN SELECT * FROM dbt_tutorial.customer_orders WHERE customer_segment = 'High Value';

# リソース使用量の確認
SELECT 
    query_text,
    execution_time,
    warehouse_size,
    credits_used,
    bytes_scanned
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY 
WHERE query_text LIKE '%customer_orders%'
    AND start_time >= CURRENT_DATE() - INTERVAL '1 day'
ORDER BY execution_time DESC;`}
          title="パフォーマンス監視"
          showLineNumbers={true}
          maxLines={20}
          maxWidth="max-w-none"
        />

        <CodeBlock
          code={`# パフォーマンステストの自動化
# tests/performance/test_query_performance.sql
-- 重要なクエリが5秒以内に完了することを確認
WITH performance_test AS (
    SELECT 
        CURRENT_TIMESTAMP() AS start_time,
        *
    FROM {{ ref('customer_orders') }}
    WHERE customer_segment = 'High Value'
),
execution_check AS (
    SELECT 
        COUNT(*) AS result_count,
        DATEDIFF('second', MIN(start_time), CURRENT_TIMESTAMP()) AS execution_seconds
    FROM performance_test
)

SELECT *
FROM execution_check
WHERE execution_seconds > 5  -- 5秒を超える場合はテスト失敗

# packages.yml（必要なdbtパッケージの追加）
packages:
  - package: dbt-labs/dbt_utils
    version: 1.1.1
  - package: calogica/dbt_expectations
    version: 0.9.0
  - package: dbt-labs/codegen
    version: 0.11.0`}
          title="パフォーマンステスト自動化"
          showLineNumbers={true}
          maxLines={25}
          maxWidth="max-w-none"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順7: 総合テストとレポート</h3>
        <p className="mb-3">
          すべての改善を統合してテストし、運用レポートを作成します。
        </p>

        <CodeBlock
          code={`# 包括的なテスト実行
dbt deps  # パッケージのインストール
dbt seed  # シードデータのロード
dbt run   # 全モデルの実行
dbt test  # 全テストの実行

# テスト結果の詳細確認
dbt test --store-failures

# 失敗したテストの詳細確認
SELECT * FROM dbt_tutorial.dbt_test_failures;

# ドキュメント生成と確認
dbt docs generate
dbt docs serve --port 8080

# パフォーマンス分析レポート
dbt run-operation print_profile_docs

# 依存関係グラフの生成
dbt deps --dry-run
dbt run --dry-run`}
          title="総合テスト実行"
          showLineNumbers={true}
          maxLines={20}
          maxWidth="max-w-none"
        />
      </div>

      <Alert className="bg-green-50 dark:bg-green-950 border-l-4 border-green-400 mt-6">
        <ShieldCheckIcon className="h-5 w-5 text-green-600" />
        <AlertTitle className="font-bold text-green-800 dark:text-green-200">プロダクション運用準備完了</AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-300 leading-loose">
          この章で実装した内容により、以下が達成されます：<br/>
          ✓ 高性能なクエリ実行（クラスタリング、インクリメンタル処理）<br/>
          ✓ 包括的なデータ品質保証（テスト、検証）<br/>
          ✓ 詳細なドキュメントと可視化<br/>
          ✓ 自動化された監視・アラート<br/>
          ✓ 継続的なパフォーマンス改善<br/>
          これで、エンタープライズレベルのデータパイプラインが完成しました。
        </AlertDescription>
      </Alert>

      <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mt-4">
        <ListOrderedIcon className="h-5 w-5 text-blue-600" />
        <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">運用フェーズでの継続改善</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
          • <strong>定期レビュー</strong>: 月次でパフォーマンスとデータ品質をレビュー<br/>
          • <strong>利用者フィードバック</strong>: データ利用者からの要望を収集・反映<br/>
          • <strong>技術更新</strong>: dbtとSnowflakeの新機能の活用<br/>
          • <strong>スケーラビリティ</strong>: データ量増加に対する継続的な最適化<br/>
          • <strong>セキュリティ</strong>: データアクセス権限とプライバシー保護の強化
        </AlertDescription>
      </Alert>

      {/* ページネーション */}
      <div className="mt-8 flex justify-between items-center">
        <div className="w-1/3">
          <a href="/text/pipeline/07" className="inline-flex items-center gap-2 p-2 px-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
            Back
          </a>
        </div>
        <div className="w-1/3 text-center">
          <span className="text-sm text-gray-500">Chapter 8 / 8</span>
        </div>
        <div className="w-1/3 text-right">
          <span className="text-sm text-gray-400">完了</span>
        </div>
      </div>
    </div>
  );
}

