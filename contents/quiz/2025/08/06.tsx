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
    created_at: new Date("2025-08-06"),
    updated_at: new Date("2025-08-06"),

    // ----- quiz -----
    title: "dbtモデルのスタイルガイド",
    question_jsx: <QuizQuestion />,
    options: {
      0: "models.with.dots（ドットを使用）",
      1: "models_without_dots（アンダースコアを使用）", 
      2: "ModelsWithCamelCase（キャメルケース）",
      3: "models-with-hyphens（ハイフン使用）",
    },
    answers: [1],
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
        dbtモデルの命名規則について、
        <strong className="text-emerald-500">推奨される</strong>
        命名パターンはどれですか？
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
          <p className="font-semibold mb-2">✅ 正解: models_without_dots（アンダースコアを使用）</p>
          <p className="pl-4 mb-2">
            dbtでは<strong className="text-emerald-500">アンダースコア（snake_case）</strong>を使用したモデル命名を推奨しています。
            これにはいくつかの重要な理由があります：
          </p>
          <ul className="list-disc pl-8 space-y-1">
            <li>多くのデータプラットフォームでは<code>database.schema.object</code>の形式でドットを使用するため</li>
            <li>ドットを使用すると、クォートが必要になり複雑性が増す</li>
            <li>特定のdbtの機能で問題が発生するリスクがある</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">❌ 間違っている選択肢：</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              <strong>models.with.dots：</strong> ドットの使用は避けるべきです。データプラットフォームとの競合や
              クォートの必要性により問題が発生する可能性があります。
            </li>
            <li>
              <strong>ModelsWithCamelCase：</strong> キャメルケースは推奨されません。SQLの慣習では
              snake_caseが一般的で、可読性も向上します。
            </li>
            <li>
              <strong>models-with-hyphens：</strong> ハイフンも推奨されません。多くのデータベースでは
              識別子にハイフンを使用する際にクォートが必要になります。
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold mb-2">📝 追加のベストプラクティス：</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>モデル名は<strong>複数形</strong>を使用する（例：customers, orders, products）</li>
            <li>プライマリキーは<code>&lt;object&gt;_id</code>形式で命名する（例：customer_id）</li>
            <li>ブール値には<code>is_</code>や<code>has_</code>のプレフィックスを付ける</li>
            <li>タイムスタンプは<code>&lt;event&gt;_at</code>形式で命名する（例：created_at）</li>
            <li>日付は<code>&lt;event&gt;_date</code>形式で命名する（例：created_date）</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="font-semibold mb-2">🔗 参考コード例：</p>
          <CodeBlock code={`-- ✅ 良い例
models/
  customers.sql           -- snake_case、複数形
  customer_orders.sql     -- 関連性が明確
  dim_customers.sql       -- ディメンションテーブル

-- ❌ 悪い例  
models/
  customer.order.sql      -- ドットを含む
  CustomerOrders.sql      -- キャメルケース
  customer-orders.sql     -- ハイフンを含む`} />
        </div>
      </div>
    </div>
  );
}