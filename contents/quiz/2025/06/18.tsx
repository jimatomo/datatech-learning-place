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
    created_at: new Date("2025-06-18"),
    updated_at: new Date("2025-06-18"),

    // ----- quiz -----
    title: "Snowflake ABS関数の挙動について",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ABS(10) の結果は 10 です。",
      1: "ABS(-10) の結果は 10 です。",
      2: "ABS(0) の結果は 0 です。",
      3: "ABS(NULL) の結果は 0 です。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "ABS | Snowflake Documentation", url: "https://docs.snowflake.com/ja/sql-reference/functions/abs" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeの数値関数 <code>ABS</code> に関する説明のうち、<strong className="text-red-500">誤っているもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  const code = `
SELECT 
    column1,
    ABS(column1) AS abs_value
FROM (VALUES (10), (-10), (0), (NULL)) AS t(column1);

/* 結果
+---------+-----------+
| COLUMN1 | ABS_VALUE |
|---------+-----------|
|      10 |        10 |
|     -10 |        10 |
|       0 |         0 |
|    NULL |      NULL |
+---------+-----------+
*/
  `.trim();
  return (
    <div className="text-xs md:text-sm">
      <p>
        <code>ABS</code> 関数は、引数として受け取った数値式の絶対値を返します。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢について：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>ABS(10) の結果は 10 です。:</strong>
          <br />
          これは正しい説明です。正の数の絶対値は元の数と同じです。
        </li>
        <li>
          <strong>ABS(-10) の結果は 10 です。:</strong>
          <br />
          これも正しい説明です。負の数の絶対値は、その数の符号を反転させた値になります。
        </li>
        <li>
          <strong>ABS(0) の結果は 0 です。:</strong>
          <br />
          これも正しい説明です。0の絶対値は0です。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">誤った選択肢について：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>ABS(NULL) の結果は 0 です。:</strong>
          <br />
          これが誤った説明です。Snowflakeを含む多くのSQLデータベースでは、関数に <code>NULL</code> を渡すと、結果も <code>NULL</code> になります。したがって、<code>ABS(NULL)</code> は <code>0</code> ではなく <code>NULL</code> を返します。
        </li>
      </ul>
      <p className="pt-4">
        <strong>実行例:</strong>
      </p>
      <CodeBlock code={code} />
    </div>
  );
} 
