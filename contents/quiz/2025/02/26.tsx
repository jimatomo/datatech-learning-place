import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "CTE", "Materialization", "Data Modeling"],
    created_at: new Date("2025-02-26"),
    updated_at: new Date("2025-02-26"),

    // ----- quiz -----
    title: "Snowflakeにおける共通テーブル式（CTE）のマテリアライズ",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "CTEが複数回参照されている場合",
      1: "CTEが1回のみ参照されている場合",
      2: "CTEがネストしている場合",
      3: "CTEがWHERE句を含む場合"
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake における CTE のマテリアライズ", url: "https://zenn.dev/indigo13love/articles/a27b93bd704986" },
    ],
  });
  return quiz;
}

// SQLコード例
const sql_code1 = `-- 例1: 複数回参照される場合
WITH
cte0 AS (
  SELECT c1
  FROM t1
),
cte1 AS (
  SELECT c1
  FROM cte0
  WHERE c1 > 10000
),
cte2 AS (
  SELECT c1
  FROM cte0
  WHERE c1 < 100000
)
SELECT *
FROM cte1
JOIN cte2 USING (c1);`;

const sql_code2 = `-- 例2: 1回のみ参照される場合
WITH
cte1 AS (
  SELECT c1
  FROM t1
  WHERE c1 > 10000
)
SELECT c1
FROM cte1
WHERE c1 < 100000;`;

function QuizQuestion() {
  return (
    <div>
      <p className="pb-2">
        Snowflakeにおいて、共通テーブル式（CTE）がマテリアライズされる主な条件は次のうちどれですか？
        （徐々に改善されるので挙動が古くなっている可能性があります。出典をもとにクイズ作成時点で検証した動作になります。）
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeでは、CTEがマテリアライズされる主な条件は「当該CTEがクエリ内で複数回参照されている場合」です。
      </p>
      <CodeBlock code={sql_code1} showLineNumbers={true} />
      <CodeBlock code={sql_code2} showLineNumbers={true} />
      <p className="pt-2">
        例1では、<code>cte0</code>が<code>cte1</code>と<code>cte2</code>の両方から参照されているため、<code>cte0</code>はマテリアライズされます。
        プロファイル内に<strong>WithClause</strong>および<strong>WithReference</strong>というオペレータが出現します。
      </p>
      <p className="pt-2">
        例2では、<code>cte1</code>は1回しか参照されていないため、マテリアライズされません。
        このケースでは、CTEはサブクエリやインラインビューとして解釈・展開され、CTE外のフィルタや集約とマージされます。
      </p>
      <p className="pt-2">
        ただし、CTEがマテリアライズされる場合でも、可能な限りフィルタや集約のプッシュダウンは適用されるため、
        必ずしもCTEそのもののマテリアライズではなく、最適化された結果がマテリアライズされることがあります（賢い）。
      </p>
      <p className="pt-2">
        例外として、CTEがコンパイル時や実行時に定数に置換できるケースでは、異なる挙動を示します。
      </p>
      <p className="pt-2">
        また、必ずしもマテリアライズされると速くなるわけではなく、実体化させるコストの方が大きい場合があるので注意が必要です。
      </p>
    </div>
  );
} 

