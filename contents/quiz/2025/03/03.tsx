import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Materialized View", "Snowflake Basic"],
    created_at: new Date("2025-03-03"),
    updated_at: new Date("2025-03-03"),

    // ----- quiz -----
    title: "Snowflakeのマテリアライズドビューについて",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "マテリアライズドビューは自動的にバックグラウンドプロセスによって更新される",
      1: "マテリアライズドビューに対して直接INSERT、UPDATE、DELETEなどのDML操作を実行できる",
      2: "マテリアライズドビューはEnterprise Edition以上で利用可能な機能である",
      3: "マテリアライズドビューはTime Travel機能を使用して過去の時点でクエリすることができる",
    },
    answers: [0, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "マテリアライズドビューの使用", url: "https://docs.snowflake.com/ja/user-guide/views-materialized" },
      { title: "ビューの概要", url: "https://docs.snowflake.com/ja/user-guide/views-introduction" },
      { title: "CREATE MATERIALIZED VIEW", url: "https://docs.snowflake.com/ja/sql-reference/sql/create-materialized-view" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Snowflakeのマテリアライズドビューについて、正しい選択肢を選択してください。
      </span>
    </div>
  );
}

const sample_code_create_mv = `-- マテリアライズドビューの作成例
CREATE MATERIALIZED VIEW sales_by_date AS
  SELECT 
    date_trunc('day', sale_date) AS day,
    SUM(amount) AS total_sales,
    COUNT(*) AS transaction_count
  FROM sales
  WHERE sale_date >= DATEADD(month, -3, CURRENT_DATE())
  GROUP BY 1;`

const sample_code_query_mv = `-- マテリアライズドビューのクエリ例
SELECT 
  day, 
  total_sales,
  transaction_count
FROM sales_by_date
WHERE day >= DATEADD(week, -1, CURRENT_DATE())
ORDER BY day DESC;`

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        マテリアライズドビューは、クエリ仕様（ビュー定義のSELECT）から派生した事前に計算されたデータセットであり、
        後で使用するために保存されます。データは事前に計算されているため、マテリアライズドビューのクエリは、
        ビューのベーステーブルに対してクエリを実行するよりも高速です。
      </p>
      <p className="py-2">
        マテリアライズドビューの特徴：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">マテリアライズドビューはEnterprise Edition以上で利用可能です</li>
        <li className="pb-2">バックグラウンドプロセスが自動的にデータをマテリアライズドビューに保持します</li>
        <li className="pb-2">マテリアライズドビューに対して標準のDML操作（INSERT、UPDATE、DELETE）を実行することはできません</li>
        <li className="pb-2">Time Travel機能を使用して過去の時点でマテリアライズドビューをクエリすることはサポートされていません</li>
        <li className="pb-2">マテリアライズドビューのメンテナンスはクレジットを消費します</li>
      </ul>
      <p className="py-2">
        以下は、マテリアライズドビューを作成する例です：
      </p>
      <CodeBlock showLineNumbers={false} code={sample_code_create_mv} />
      <p className="py-2">
        以下は、マテリアライズドビューをクエリする例です：
      </p>
      <CodeBlock showLineNumbers={false} code={sample_code_query_mv} />      
      <p className="pt-2">
        マテリアライズドビューは、一般的な繰り返しのクエリパターンで構成されるワークロードのクエリパフォーマンスを向上させるように設計されています。
        ただし、中間結果を具体化すると追加コストが発生するため、これらの結果を十分頻繁に再利用して得られる節約分がコストを相殺できるかどうかを検討する必要があります。
      </p>
    </div>
  );
} 
