import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Modeling", "SQL", "dbt"],
    created_at: new Date("2025-08-13"),
    updated_at: new Date("2025-08-13"),

    // ----- quiz -----
    title: "dbtプロジェクトのフォルダ構造ベストプラクティス",
    question_jsx: <QuizQuestion />,
    options: {
      0: "models/staging/ → models/marts/ → models/intermediate/",
      1: "models/raw/ → models/staging/ → models/marts/",
      2: "models/staging/ → models/intermediate/ → models/marts/",
      3: "models/bronze/ → models/silver/ → models/gold/",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "dbt Labs - How we style our dbt models", url: "https://docs.getdbt.com/best-practices/how-we-style/1-how-we-style-our-dbt-models" },
      { title: "dbt Labs - How we style our dbt projects", url: "https://docs.getdbt.com/best-practices/how-we-style/0-how-we-style-our-dbt-projects" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        dbtプロジェクトでのフォルダ構造について、
        <strong className="text-emerald-500">推奨される</strong>
        データフローの順序はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-emerald-500">正解の解説：</p>
      
      <div className="space-y-4">
        <div>
          <p className="font-semibold mb-2">✅ 正解: models/staging/ → models/intermediate/ → models/marts/</p>
          <p className="pl-4 mb-2">
            dbtでは<strong className="text-emerald-500">段階的なデータ変換</strong>に基づいたフォルダ構造を推奨しています。
            これは<strong>ELT（Extract, Load, Transform）</strong>の思想に基づいています：
          </p>
          <ul className="list-disc pl-8 space-y-1">
            <li><code>staging/</code>：ソースデータの軽い清掃・正規化（1:1の関係）</li>
            <li><code>intermediate/</code>：複雑なビジネスロジックの適用、複数テーブルの結合</li>
            <li><code>marts/</code>：エンドユーザーが使用する最終的なテーブル・ビュー</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">❌ 間違っている選択肢：</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              <strong>models/staging/ → models/marts/ → models/intermediate/：</strong> 
              順序が間違っています。intermediate層はmartsの前に配置されるべきです。
            </li>
            <li>
              <strong>models/raw/ → models/staging/ → models/marts/：</strong> 
              rawフォルダは通常使用しません。ソースデータは<code>sources.yml</code>で定義します。
            </li>
            <li>
              <strong>models/bronze/ → models/silver/ → models/gold/：</strong> 
              これはDatabricksのメダリオンアーキテクチャです。dbtでは異なる命名規則を使用します。
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold mb-2">📁 推奨フォルダ構造：</p>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>staging/</strong>：各ソースシステムごとにサブフォルダを作成</li>
            <li><strong>intermediate/</strong>：複雑な変換処理、一時的なモデル</li>
            <li><strong>marts/</strong>：ビジネス領域ごとにサブフォルダを作成（finance, marketing等）</li>
            <li><strong>utilities/</strong>：汎用的なヘルパーモデル（例：all_dates.sql）</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="font-semibold mb-2">🔗 実例：</p>
          <CodeBlock code={`models/
├── staging/
│   ├── salesforce/
│   │   ├── stg_salesforce__accounts.sql
│   │   └── stg_salesforce__opportunities.sql
│   └── stripe/
│       ├── stg_stripe__customers.sql
│       └── stg_stripe__payments.sql
├── intermediate/
│   ├── int_customer_orders.sql
│   └── int_order_payments.sql
├── marts/
│   ├── finance/
│   │   ├── dim_customers.sql
│   │   └── fct_orders.sql
│   └── marketing/
│       ├── customer_segments.sql
│       └── campaign_performance.sql
└── utilities/
    └── all_dates.sql`} />
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="font-semibold mb-2">💡 命名規則のポイント：</p>
          <ul className="list-disc pl-4 space-y-1">
            <li><code>stg_</code>：stagingモデルのプレフィックス</li>
            <li><code>int_</code>：intermediateモデルのプレフィックス</li>
            <li><code>dim_</code>：ディメンションテーブル</li>
            <li><code>fct_</code>：ファクトテーブル</li>
          </ul>
        </div>
      </div>
    </div>
  );
}