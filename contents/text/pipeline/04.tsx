import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CodeBlock } from "@/components/ui/code-block"
import { CheckCircleIcon, ListOrderedIcon, DatabaseIcon } from "lucide-react"


export default function TextContents() {
  return (
    <div className="w-full">
      <Alert className="bg-red-50 dark:bg-red-950 border-l-4 border-red-400 mb-6">
        <AlertTitle className="font-bold text-red-800 dark:text-red-200">
          この章の内容は、まだ更新中です。
        </AlertTitle>
      </Alert>

      <h1 className="text-2xl font-bold mb-4">Chapter 4: dbtモデルの開発</h1>

      <p className="mb-4">
        この章では、個人の金融取引データを使ってdbtモデルを作成し、データ変換の基本的な処理を学びます。
        複数のCSVデータソースをロードし、クリーニング、統合して、分析用のデータマートを構築するまでを実践していきます。
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">主な学習内容</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>dbtプロジェクトの初期化と構造の理解</li>
          <li>複数のCSVデータの準備とSnowflakeへのロード</li>
          <li>ソーステーブルの定義</li>
          <li>ステージングモデルの作成（データクリーニングと整形）</li>
          <li>マートモデルの作成（複数データソースの統合と集計）</li>
          <li>モデル間の依存関係の構築（ref関数）</li>
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
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順2: サンプルデータの準備</h3>
        <p className="mb-3">
          データ変換の練習用に、個人の金融取引に関する4種類のサンプルCSVデータを使用します。
          銀行の入出金、クレジットカードの明細、Suicaの利用履歴、そして家計簿アプリのデータです。
        </p>
        <p className="mb-3">
          まず、これらのCSVファイルをダウンロードします。（ファイルのダウンロードURLは後ほどこちらで設定します。）
          ダウンロード後、Snowflakeにデータをロードします。
        </p>

        <CodeBlock
          code={`-- Snowflakeにログインして、以下のSQLを実行
-- サンプルデータベースとスキーマの作成
CREATE DATABASE IF NOT EXISTS RAW;
CREATE SCHEMA IF NOT EXISTS RAW.PUBLIC;

-- 銀行取引テーブル
CREATE OR REPLACE TABLE RAW.PUBLIC.BANK_TRANSACTIONS (
    "日付" DATE, "摘要" STRING, "摘要内容" STRING, "支払い金額" NUMBER,
    "預かり金額" NUMBER, "差引残高" NUMBER, "メモ" STRING,
    "未資金化区分" STRING, "入払区分" STRING
);

-- クレジットカード決済テーブル
CREATE OR REPLACE TABLE RAW.PUBLIC.CREDIT_CARD_TRANSACTIONS (
    "日付" DATE, "利用先" STRING, "利用者" STRING, "支払方法" STRING, "不明1" STRING,
    "支払月" STRING, "利用金額" NUMBER, "支払総額" NUMBER, "不明2" STRING, "不明3" STRING,
    "不明4" STRING, "不明5" STRING, "不明6" STRING
);

-- Suica利用履歴テーブル
CREATE OR REPLACE TABLE RAW.PUBLIC.SUICA_TRANSACTIONS (
    "日付" STRING, "種別" STRING, "入場駅" STRING, "退場駅" STRING,
    "残高" NUMBER, "利用額" NUMBER
);

-- 家計簿アプリデータテーブル
CREATE OR REPLACE TABLE RAW.PUBLIC.KAKEIBO_TRANSACTIONS (
    "日付" DATE, "方法" STRING, "カテゴリ" STRING, "カテゴリの内訳" STRING,
    "支払元" STRING, "入金先" STRING, "品目" STRING, "メモ" STRING, "お店" STRING,
    "通貨" STRING, "収入" NUMBER, "支出" NUMBER
);`}
          title="サンプルテーブル作成"
          showLineNumbers={true}
          maxLines={30}
        />
        <p className="mt-4">
          テーブルを作成したら、SnowsightのUIを使って、ダウンロードした各CSVファイルを対応するテーブルにロードしてください。
          ファイル形式はヘッダーが1行あるCSVです。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順3: ソーステーブルの定義</h3>
        <p className="mb-3">
          dbtでソーステーブル（生データ）を定義し、モデルから参照できるようにします。
        </p>

        <CodeBlock
          code={`# modelsディレクトリの構造を作成
mkdir -p models/staging/personal_finance
mkdir -p models/marts/core
mkdir -p models/marts/finance

# ソース定義ファイルを作成
cat > models/staging/personal_finance/_sources.yml << 'EOF'
version: 2

sources:
  - name: personal_finance
    description: "個人の金融取引に関する生データ"
    database: RAW
    schema: PUBLIC
    tables:
      - name: bank_transactions
        description: "銀行の入出金データ"
      - name: credit_card_transactions
        description: "クレジットカードの決済データ"
      - name: suica_transactions
        description: "Suicaの利用履歴データ"
      - name: kakeibo_transactions
        description: "家計簿アプリのデータ"
EOF`}
          title="ソース定義ファイル作成"
          showLineNumbers={true}
          maxLines={35}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順4: ステージングモデルの作成</h3>
        <p className="mb-3">
          生データを正規化・クリーニングするステージングモデルを作成します。
          ここではカラム名を日本語から英語に変換し、簡単なデータ整形を行います。
        </p>

        <CodeBlock
          code={`# 銀行取引ステージングモデル
cat > models/staging/personal_finance/stg_bank_transactions.sql << 'EOF'
select
    "日付" as transaction_date,
    "摘要" as transaction_category,
    "摘要内容" as description,
    "支払い金額" as payment_amount,
    "預かり金額" as deposit_amount,
    "差引残高" as balance
from {{ source('personal_finance', 'bank_transactions') }}
EOF

# クレジットカード決済ステージングモデル
cat > models/staging/personal_finance/stg_credit_card_transactions.sql << 'EOF'
select
    "日付" as transaction_date,
    "利用先" as store,
    "支払方法" as payment_method,
    "利用金額" as amount
from {{ source('personal_finance', 'credit_card_transactions') }}
EOF

# Suica利用履歴ステージングモデル
cat > models/staging/personal_finance/stg_suica_transactions.sql << 'EOF'
-- Suicaデータは年に情報が含まれていないため、ここでは2025年と仮定します。
select
    to_date('2025/' || "日付", 'YYYY/MM/DD') as transaction_date,
    "種別" as transaction_type,
    "入場駅" as entry_station,
    "退場駅" as exit_station,
    "残高" as balance,
    "利用額" as amount
from {{ source('personal_finance', 'suica_transactions') }}
EOF

# 家計簿アプリデータステージングモデル
cat > models/staging/personal_finance/stg_kakeibo_transactions.sql << 'EOF'
select
    "日付" as transaction_date,
    "方法" as method,
    "カテゴリ" as category,
    "カテゴリの内訳" as sub_category,
    "品目" as item,
    "お店" as store,
    "収入" as income,
    "支出" as expense
from {{ source('personal_finance', 'kakeibo_transactions') }}
EOF`}
          title="ステージングモデル作成"
          showLineNumbers={true}
          maxLines={40}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">手順5: マートモデルの作成</h3>
        <p className="mb-3">
          ビジネス価値のあるデータマートを作成します。ここでは、すべての取引を統合したファクトテーブルと、月次の財務サマリテーブルを作成します。
        </p>

        <CodeBlock
          code={`# 全取引ファクトテーブル
cat > models/marts/core/fct_transactions.sql << 'EOF'
{{ config(materialized='table') }}

with bank as (
    select
        transaction_date,
        '銀行' as source,
        coalesce(deposit_amount, 0) - coalesce(payment_amount, 0) as amount,
        description,
        transaction_category as category
    from {{ ref('stg_bank_transactions') }}
),

credit_card as (
    select
        transaction_date,
        'クレジットカード' as source,
        amount * -1 as amount,
        store as description,
        'カード利用' as category
    from {{ ref('stg_credit_card_transactions') }}
),

suica as (
    select
        transaction_date,
        'Suica' as source,
        amount,
        case
            when transaction_type = '物販' then '物販'
            when transaction_type = 'ﾊﾞｽ等' then 'バス等利用'
            when entry_station is not null then entry_station || ' -> ' || exit_station
            else transaction_type
        end as description,
        '交通費' as category
    from {{ ref('stg_suica_transactions') }}
),

kakeibo as (
    select
        transaction_date,
        '家計簿' as source,
        coalesce(income, 0) - coalesce(expense, 0) as amount,
        coalesce(item, sub_category) as description,
        category
    from {{ ref('stg_kakeibo_transactions') }}
)

select * from bank
union all
select * from credit_card
union all
select * from suica
union all
select * from kakeibo
EOF

# 月次財務サマリ
cat > models/marts/finance/monthly_summary.sql << 'EOF'
{{ config(materialized='table') }}

select
    date_trunc('month', transaction_date)::date as year_month,
    source,
    sum(case when amount > 0 then amount else 0 end) as monthly_income,
    sum(case when amount < 0 then amount * -1 else 0 end) as monthly_expense,
    sum(amount) as monthly_net_change,
    count(*) as transaction_count
from {{ ref('fct_transactions') }}
group by 1, 2
order by 1, 2
EOF`}
          title="マートモデル作成"
          showLineNumbers={true}
          maxLines={45}
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

# 依存関係の確認 (パッケージを使用している場合)
# dbt deps

# 全モデルの実行
dbt run

# 特定のモデルの実行結果確認
dbt run --select stg_bank_transactions

# 特定のモデルとその依存関係の実行
dbt run --select +monthly_summary

# テストの実行 (今後テストを追加した場合)
dbt test

# ドキュメント生成
dbt docs generate

# ドキュメントサーバー起動（ローカルで確認）
dbt docs serve`}
          title="dbtコマンド実行"
          showLineNumbers={true}
          maxLines={20}
        />

        <Alert className="bg-green-50 dark:bg-green-950 border-l-4 border-green-400 mt-4">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <AlertTitle className="font-bold text-green-800 dark:text-green-200">実行成功の確認</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300 leading-loose">
            dbt runが成功すると、Snowflakeに以下のテーブル・ビューが作成されます：<br/>
            ✓ ステージングビュー：stg_bank_transactions, stg_credit_card_transactions, stg_suica_transactions, stg_kakeibo_transactions<br/>
            ✓ マートテーブル：fct_transactions, monthly_summary<br/>
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

-- 全取引ファクトテーブルの確認
SELECT * FROM dbt_tutorial.fct_transactions ORDER BY transaction_date DESC LIMIT 10;

-- 月次財務サマリの確認
SELECT * FROM dbt_tutorial.monthly_summary ORDER BY year_month, source;`}
          title="結果確認クエリ"
          showLineNumbers={true}
          maxLines={15}
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

