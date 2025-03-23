import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Recursive CTE", "Data Modeling"],
    created_at: new Date("2025-02-19"),
    updated_at: new Date("2025-02-19"),

    // ----- quiz -----
    title: "再帰的CTEを使用したフィボナッチ数列の生成",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "WITH RECURSIVE fib (n, fib_n, next_fib) AS (\n  SELECT 1, 1, 1\n  UNION ALL\n  SELECT n + 1, next_fib, fib_n + next_fib\n  FROM fib WHERE n < 10\n)\nselect n, fib_n as fibonacci_number from fib order by n",
      1: "WITH RECURSIVE fib (n, fib_n) AS (\n  SELECT 1, 1\n  UNION ALL\n  SELECT n + 1, fib_n + LAG(fib_n) OVER (ORDER BY n)\n  FROM fib WHERE n < 10\n)\nselect n, fib_n as fibonacci_number from fib order by n",
      2: "WITH fib (n, fib_n) AS (\n  SELECT 1, 1\n  UNION ALL\n  SELECT n + 1, SUM(fib_n) OVER (ORDER BY n ROWS 2 PRECEDING)\n  FROM fib WHERE n < 10\n)\nselect n, fib_n as fibonacci_number from fib order by n",
      3: "WITH RECURSIVE fib AS (\n  SELECT 1 as n, 1 as fib_n\n  UNION ALL\n  SELECT n + 1, fib_n * n\n  FROM fib WHERE n < 10\n)\nselect n, fib_n as fibonacci_number from fib order by n"
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "WITH - Snowflake Documentation", url: "https://docs.snowflake.com/ja/sql-reference/constructs/with" },
      { title: "CTEs（共通テーブル式）の使用 - Snowflake Documentation", url: "https://docs.snowflake.com/ja/user-guide/queries-cte#recursive-ctes-and-hierarchical-data" },
    ],
  });
  return quiz;
}

// SQLコード
const sql_code = `WITH RECURSIVE fib (n, curr, prev) AS (
  -- アンカーメンバー：初期値を設定
  SELECT 1, 1, 0
  UNION ALL
  -- 再帰メンバー：次のフィボナッチ数を計算
  SELECT n + 1, curr + prev, curr
  FROM fib 
  WHERE n < 10
)
SELECT n, curr as fibonacci_number
FROM fib
ORDER BY n;`;

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        フィボナッチ数列（1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...）の最初の10項を生成するための再帰的CTEとして、
        正しいSQLを選択してください。以下はサンプルです。
      </p>
      <CodeBlock code={sql_code} showLineNumbers={true} />
      <p className="pb-4 pt-4">
        実行結果：
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">n</TableHead>
            <TableHead className="text-center">fibonacci_number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>4</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>5</TableCell>
            <TableCell>5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>6</TableCell>
            <TableCell>8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>13</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>8</TableCell>
            <TableCell>21</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>9</TableCell>
            <TableCell>34</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>10</TableCell>
            <TableCell>55</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        フィボナッチ数列を生成するための再帰的CTEでは、以下の要素が重要です：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          アンカーメンバー：最初の値（n=1, curr=1, prev=0）を設定します
        </li>
        <li>
          再帰メンバー：現在の値（curr）と前の値（prev）を使って次のフィボナッチ数を計算します
        </li>
        <li>
          終了条件：n &lt; 10 で最初の10項で停止するようにします
        </li>
      </ul>
      <p>
        誤った選択肢の解説：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          再帰的CTEの中では、ウィンドウ関数を利用できません。
        </li>
        <li>
          掛け算をしているとそもそもフィボナッチ数列は生成できません。
        </li>
      </ul>
      <p>
        正しい選択肢では、アンカー部分で1,1,1でスタートして、最初の再帰部分で2,1,2になり、その次は3,2,3 ... と順調に増えていきます。
      </p>
    </div>
  );
} 

