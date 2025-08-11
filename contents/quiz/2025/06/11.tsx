import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Modeling", "SQL", "Snowflake"],
    created_at: new Date("2025-06-11"),
    updated_at: new Date("2025-06-11"),

    // ----- quiz -----
    title: "Snowflake MAX_BY関数の挙動について",
    question_jsx: <QuizQuestion />,
    options: {
      0: "MAX_BY(col1, col2) は、col1 の値が最大となる行の col2 の値を返す。",
      1: "col_containing_maximum に最大値を持つ行が複数存在する場合、常に最初に見つかった行の値を返すため、結果は決定的である。",
      2: "オプションの第3引数で返す値の最大数を指定でき、その数は100までである。",
      3: "MAX_BY(col1, col2) は、col2 の値が最大となる行の col1 の値を返す。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "MAX_BY | Snowflake Documentation", url: "https://docs.snowflake.com/ja/sql-reference/functions/max_by" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeの集計関数 <code>MAX_BY</code> に関する説明のうち、<strong>正しいもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  const code = `
CREATE OR REPLACE TABLE employees(employee_id NUMBER, salary NUMBER);

INSERT INTO employees VALUES
  (900, 15000),
  (2010, 15000),
  (1001, 10000);

-- salary が最大である行は2つ (employee_id 900 と 2010)
-- この場合、どちらの employee_id が返されるかは非決定的
SELECT MAX_BY(employee_id, salary) FROM employees;
-- 実行するたびに 900 または 2010 のどちらかが返る可能性がある
  `.trim();
  return (
    <div className="text-xs md:text-sm">
      <p>
        <code>MAX_BY</code> 関数は、ある列の最大値を持つ行を検索し、その行にある別の列の値を返します。構文は <code>MAX_BY(&lt;返す値の列&gt;, &lt;最大値を含む列&gt;)</code> です。
      </p>

      <p className="py-2 font-semibold text-red-500">誤った選択肢：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>MAX_BY(col1, col2) は、col1 の値が最大となる行の col2 の値を返す。:</strong>
          <br />
          これは誤りです。引数の順序が逆です。<code>MAX_BY</code>は第2引数 (<code>col2</code>) の値が最大となる行を探し、その行の第1引数 (<code>col1</code>) の値を返します。
        </li>
        <li>
          <strong>col_containing_maximum に最大値を持つ行が複数存在する場合、常に最初に見つかった行の値を返すため、結果は決定的である。:</strong>
          <br />
          これは誤りです。公式ドキュメントに記載の通り、最大値を持つ行が複数存在する場合、この関数の結果は<strong>非決定的 (non-deterministic)</strong> です。つまり、実行するたびに結果が変わる可能性があります。
        </li>
        <li>
          <strong>オプションの第3引数で返す値の最大数を指定でき、その数は100までである。:</strong>
          <br />
          これは誤りです。第3引数で返す値の数を指定できますが、その最大数は <code>1000</code> です。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-emerald-500">MAX_BY(col1, col2) は、col2 の値が最大となる行の col1 の値を返す。:</strong>
          <br />
          これが正しい説明です。関数は第2引数 (<code>col2</code>) の値が最大となる行を探し、その行の第1引数 (<code>col1</code>) の値を返します。
        </li>
      </ul>
      <p className="pt-4">
        <strong>非決定性の例:</strong>
      </p>
      <CodeBlock code={code} />
    </div>
  );
} 
