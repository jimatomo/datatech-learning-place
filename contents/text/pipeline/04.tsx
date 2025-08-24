import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CodeBlock } from "@/components/ui/code-block"
import { CheckCircleIcon, ListOrderedIcon, DatabaseIcon } from "lucide-react"


export default function TextContents() {
  return (
    <div className="w-full">
      <Alert className="bg-red-50 dark:bg-red-950 border-l-4 border-red-400 mb-6">
        <AlertTitle className="font-bold text-red-800 dark:text-red-200">
          まだAIが作った適当なものなので後でガッチリ変えていく
        </AlertTitle>
      </Alert>

      <h1 className="text-2xl font-bold mb-4">Chapter 4: dbtモデルの開発</h1>

      <p className="mb-4">
        この章では、実際のデータを使ってdbtモデルを作成し、データ変換の基本的な処理を学びます。
        サンプルデータのロード、基本的な変換モデルの作成、テーブル間の関連性の構築を実践していきます。
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">主な学習内容</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>dbtプロジェクトの初期化と構造の理解</li>
          <li>サンプルデータの準備とロード</li>
          <li>ソーステーブルの定義</li>
          <li>ステージングモデルの作成</li>
          <li>マートモデルの作成</li>
          <li>モデル間の依存関係の構築</li>
          <li>dbtコマンドの実行とテスト</li>
        </ul>
      </div>

      <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mb-6">
        <DatabaseIcon className="h-5 w-5 text-blue-600" />
        <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">dbtモデリングの基本概念</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
          dbtでは、SQLファイルがモデルとなり、各モデルはSnowflakeのテーブルやビューとして実体化されます。
          ソース → ステージング → マート の3層アーキテクチャを採用することで、
          保守性と再利用性の高いデータパイプラインを構築できます。
        </AlertDescription>
      </Alert>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順1: dbtプロジェクトの初期化</h3>
        <p className="mb-3">
          まず、新しいdbtプロジェクトを作成し、基本的な設定を行います。
        </p>

        <CodeBlock
          code={`# dbtプロジェクトの初期化
dbt init dbt_tutorial

# プロジェクトディレクトリに移動
cd dbt_tutorial

# プロジェクト構造を確認
ls -la

# dbt_project.ymlの内容を確認
cat dbt_project.yml`}
          title="dbtプロジェクト初期化"
          showLineNumbers={true}
          maxLines={15}
          maxWidth="max-w-none"
        />

        <p className="mt-4">
          プロジェクトが作成されると、以下のような構造になります：
        </p>

        <CodeBlock
          code={`dbt_tutorial/
├── dbt_project.yml       # プロジェクト設定ファイル
├── models/               # SQLモデルファイル
│   └── example/
├── macros/               # カスタムマクロ
├── seeds/                # CSVデータファイル
├── snapshots/            # スナップショット設定
├── tests/                # カスタムテスト
├── analyses/             # 分析用SQL
└── README.md`}
          title="dbtプロジェクト構造"
          showLineNumbers={true}
          maxLines={12}
          maxWidth="max-w-none"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順2: サンプルデータの準備</h3>
        <p className="mb-3">
          データ変換の練習用に、eコマースのサンプルデータをSnowflakeに用意します。
        </p>

        <CodeBlock
          code={`-- Snowflakeにログインして、以下のSQLを実行
-- サンプルデータベースとスキーマの作成
CREATE DATABASE IF NOT EXISTS raw_data;
CREATE SCHEMA IF NOT EXISTS raw_data.ecommerce;

-- 顧客テーブル
CREATE OR REPLACE TABLE raw_data.ecommerce.customers (
    customer_id INT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(200),
    city VARCHAR(50),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    created_at TIMESTAMP
);

-- 商品テーブル
CREATE OR REPLACE TABLE raw_data.ecommerce.products (
    product_id INT,
    product_name VARCHAR(100),
    category VARCHAR(50),
    brand VARCHAR(50),
    price DECIMAL(10,2),
    cost DECIMAL(10,2),
    created_at TIMESTAMP
);

-- 注文テーブル
CREATE OR REPLACE TABLE raw_data.ecommerce.orders (
    order_id INT,
    customer_id INT,
    order_date DATE,
    status VARCHAR(20),
    total_amount DECIMAL(10,2),
    created_at TIMESTAMP
);

-- 注文詳細テーブル
CREATE OR REPLACE TABLE raw_data.ecommerce.order_items (
    order_item_id INT,
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10,2),
    created_at TIMESTAMP
);`}
          title="サンプルテーブル作成"
          showLineNumbers={true}
          maxLines={30}
          maxWidth="max-w-none"
        />

        <CodeBlock
          code={`-- サンプルデータの挿入
-- 顧客データ
INSERT INTO raw_data.ecommerce.customers VALUES
(1, 'John', 'Doe', 'john.doe@email.com', '555-0123', '123 Main St', 'New York', 'NY', '10001', '2023-01-15 10:00:00'),
(2, 'Jane', 'Smith', 'jane.smith@email.com', '555-0124', '456 Oak Ave', 'Los Angeles', 'CA', '90001', '2023-01-16 11:00:00'),
(3, 'Bob', 'Johnson', 'bob.johnson@email.com', '555-0125', '789 Pine St', 'Chicago', 'IL', '60601', '2023-01-17 12:00:00');

-- 商品データ
INSERT INTO raw_data.ecommerce.products VALUES
(1, 'Laptop Pro', 'Electronics', 'TechBrand', 1299.99, 800.00, '2023-01-01 09:00:00'),
(2, 'Wireless Headphones', 'Electronics', 'AudioBrand', 199.99, 120.00, '2023-01-01 09:00:00'),
(3, 'Coffee Mug', 'Home & Garden', 'DrinkWare', 15.99, 8.00, '2023-01-01 09:00:00');

-- 注文データ
INSERT INTO raw_data.ecommerce.orders VALUES
(1, 1, '2023-02-01', 'completed', 1315.98, '2023-02-01 14:00:00'),
(2, 2, '2023-02-02', 'completed', 199.99, '2023-02-02 15:00:00'),
(3, 3, '2023-02-03', 'processing', 31.98, '2023-02-03 16:00:00');

-- 注文詳細データ
INSERT INTO raw_data.ecommerce.order_items VALUES
(1, 1, 1, 1, 1299.99, '2023-02-01 14:00:00'),
(2, 1, 3, 1, 15.99, '2023-02-01 14:00:00'),
(3, 2, 2, 1, 199.99, '2023-02-02 15:00:00'),
(4, 3, 3, 2, 15.99, '2023-02-03 16:00:00');`}
          title="サンプルデータ挿入"
          showLineNumbers={true}
          maxLines={25}
          maxWidth="max-w-none"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順3: ソーステーブルの定義</h3>
        <p className="mb-3">
          dbtでソーステーブル（生データ）を定義し、モデルから参照できるようにします。
        </p>

        <CodeBlock
          code={`# modelsディレクトリの構造を作成
mkdir -p models/staging/ecommerce
mkdir -p models/marts/core
mkdir -p models/marts/finance

# ソース定義ファイルを作成
cat > models/staging/ecommerce/_sources.yml << 'EOF'
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
      
      - name: products
        description: "商品マスタ"
        columns:
          - name: product_id
            description: "商品ID"
            tests:
              - unique
              - not_null
      
      - name: orders
        description: "注文テーブル"
        columns:
          - name: order_id
            description: "注文ID"
            tests:
              - unique
              - not_null
      
      - name: order_items
        description: "注文詳細テーブル"
        columns:
          - name: order_item_id
            description: "注文詳細ID"
            tests:
              - unique
              - not_null
EOF`}
          title="ソース定義ファイル作成"
          showLineNumbers={true}
          maxLines={35}
          maxWidth="max-w-none"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順4: ステージングモデルの作成</h3>
        <p className="mb-3">
          生データを正規化・クリーニングするステージングモデルを作成します。
        </p>

        <CodeBlock
          code={`# 顧客ステージングモデル
cat > models/staging/ecommerce/stg_customers.sql << 'EOF'
{{ config(materialized='view') }}

SELECT 
    customer_id,
    TRIM(first_name) AS first_name,
    TRIM(last_name) AS last_name,
    LOWER(TRIM(email)) AS email,
    phone,
    address,
    city,
    state,
    zip_code,
    created_at
FROM {{ source('ecommerce', 'customers') }}
EOF

# 商品ステージングモデル
cat > models/staging/ecommerce/stg_products.sql << 'EOF'
{{ config(materialized='view') }}

SELECT 
    product_id,
    TRIM(product_name) AS product_name,
    TRIM(category) AS category,
    TRIM(brand) AS brand,
    price,
    cost,
    ROUND(price - cost, 2) AS margin,
    ROUND((price - cost) / price * 100, 2) AS margin_percent,
    created_at
FROM {{ source('ecommerce', 'products') }}
EOF

# 注文ステージングモデル
cat > models/staging/ecommerce/stg_orders.sql << 'EOF'
{{ config(materialized='view') }}

SELECT 
    order_id,
    customer_id,
    order_date,
    LOWER(TRIM(status)) AS status,
    total_amount,
    created_at
FROM {{ source('ecommerce', 'orders') }}
EOF

# 注文詳細ステージングモデル
cat > models/staging/ecommerce/stg_order_items.sql << 'EOF'
{{ config(materialized='view') }}

SELECT 
    order_item_id,
    order_id,
    product_id,
    quantity,
    unit_price,
    ROUND(quantity * unit_price, 2) AS line_total,
    created_at
FROM {{ source('ecommerce', 'order_items') }}
EOF`}
          title="ステージングモデル作成"
          showLineNumbers={true}
          maxLines={40}
          maxWidth="max-w-none"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順5: マートモデルの作成</h3>
        <p className="mb-3">
          ビジネス価値のあるデータマートを作成します。
        </p>

        <CodeBlock
          code={`# 顧客別売上サマリ
cat > models/marts/core/customer_orders.sql << 'EOF'
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
FROM customer_order_summary
EOF

# 商品別売上分析
cat > models/marts/core/product_performance.sql << 'EOF'
{{ config(materialized='table') }}

SELECT 
    p.product_id,
    p.product_name,
    p.category,
    p.brand,
    p.price,
    p.cost,
    p.margin,
    p.margin_percent,
    COUNT(DISTINCT oi.order_id) AS total_orders,
    SUM(oi.quantity) AS total_quantity_sold,
    SUM(oi.line_total) AS total_revenue,
    AVG(oi.quantity) AS avg_quantity_per_order,
    ROUND(SUM(oi.line_total) / SUM(oi.quantity), 2) AS avg_selling_price
FROM {{ ref('stg_products') }} p
LEFT JOIN {{ ref('stg_order_items') }} oi ON p.product_id = oi.product_id
GROUP BY 1, 2, 3, 4, 5, 6, 7, 8
ORDER BY total_revenue DESC
EOF

# 日別売上レポート
cat > models/marts/finance/daily_sales.sql << 'EOF'
{{ config(materialized='table') }}

SELECT 
    o.order_date,
    COUNT(DISTINCT o.order_id) AS total_orders,
    COUNT(DISTINCT o.customer_id) AS unique_customers,
    SUM(o.total_amount) AS daily_revenue,
    AVG(o.total_amount) AS avg_order_value,
    SUM(SUM(o.total_amount)) OVER (
        ORDER BY o.order_date 
        ROWS UNBOUNDED PRECEDING
    ) AS cumulative_revenue
FROM {{ ref('stg_orders') }} o
WHERE o.status = 'completed'
GROUP BY o.order_date
ORDER BY o.order_date
EOF`}
          title="マートモデル作成"
          showLineNumbers={true}
          maxLines={45}
          maxWidth="max-w-none"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順6: dbtモデルの実行とテスト</h3>
        <p className="mb-3">
          作成したモデルを実行し、正常に動作することを確認します。
        </p>

        <CodeBlock
          code={`# dbt接続確認
dbt debug

# 依存関係の確認
dbt deps

# 全モデルの実行
dbt run

# モデルの実行結果確認
dbt run --select stg_customers

# 特定のモデルとその依存関係の実行
dbt run --select +customer_orders

# テストの実行
dbt test

# ドキュメント生成
dbt docs generate

# ドキュメントサーバー起動（ローカルで確認）
dbt docs serve`}
          title="dbtコマンド実行"
          showLineNumbers={true}
          maxLines={20}
          maxWidth="max-w-none"
        />

        <Alert className="bg-green-50 dark:bg-green-950 border-l-4 border-green-400 mt-4">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <AlertTitle className="font-bold text-green-800 dark:text-green-200">実行成功の確認</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300 leading-loose">
            dbt runが成功すると、Snowflakeに以下のテーブル・ビューが作成されます：<br/>
            ✓ ステージングビュー：stg_customers, stg_products, stg_orders, stg_order_items<br/>
            ✓ マートテーブル：customer_orders, product_performance, daily_sales<br/>
            SnowflakeのWebUIで作成されたオブジェクトを確認してみてください。
          </AlertDescription>
        </Alert>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順7: 結果の確認</h3>
        <p className="mb-3">
          作成したモデルがSnowflakeで正常に動作していることを確認します。
        </p>

        <CodeBlock
          code={`-- Snowflakeで以下のクエリを実行して結果を確認

-- 顧客別売上サマリの確認
SELECT * FROM dbt_tutorial.customer_orders LIMIT 10;

-- 商品別パフォーマンスの確認
SELECT * FROM dbt_tutorial.product_performance ORDER BY total_revenue DESC;

-- 日別売上の確認
SELECT * FROM dbt_tutorial.daily_sales ORDER BY order_date;

-- ステージングビューの確認
SELECT COUNT(*) FROM dbt_tutorial.stg_customers;
SELECT COUNT(*) FROM dbt_tutorial.stg_products;
SELECT COUNT(*) FROM dbt_tutorial.stg_orders;
SELECT COUNT(*) FROM dbt_tutorial.stg_order_items;`}
          title="結果確認クエリ"
          showLineNumbers={true}
          maxLines={15}
          maxWidth="max-w-none"
        />
      </div>

      <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mt-6">
        <ListOrderedIcon className="h-5 w-5 text-blue-600" />
        <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">dbtモデリングのベストプラクティス</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
          • <strong>命名規則</strong>: ステージング（stg_）、マート（fct_, dim_）のプレフィックス<br/>
          • <strong>レイヤー構造</strong>: ソース → ステージング → マート の3層アーキテクチャ<br/>
          • <strong>再利用性</strong>: ref()関数でモデル間の依存関係を明確に<br/>
          • <strong>テスト</strong>: 一意性、NOT NULL、参照整合性のテスト実装<br/>
          • <strong>ドキュメント</strong>: YAMLファイルでメタデータとテストを管理
        </AlertDescription>
      </Alert>

      {/* ページネーション */}
      <div className="mt-8 flex justify-between items-center">
        <div className="w-1/3">
          <a href="/text/pipeline/03" className="inline-flex items-center gap-2 p-2 px-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
            Back
          </a>
        </div>
        <div className="w-1/3 text-center">
          <span className="text-sm text-gray-500">Chapter 4 / 8</span>
        </div>
        <div className="w-1/3 text-right">
          <a href="/text/pipeline/05" className="inline-flex items-center gap-2 p-2 px-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
            Next
          </a>
        </div>
      </div>
    </div>
  );
}

