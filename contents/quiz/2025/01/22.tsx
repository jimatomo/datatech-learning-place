import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "SQL", "QUALIFY", "Data Modeling"],
    created_at: new Date("2025-01-22"),
    updated_at: new Date("2025-01-22"),

    // ----- quiz -----
    title: "SnowflakeのQUALIFY句の使い方",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Alice (Aクラスのトップ)",
      1: "Bob",
      2: "Charlie (Bクラスのトップ)",
      3: "David",
      4: "Eve (Cクラスのトップ)",
      5: "Frank",
    },
    answers: [0, 2, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake Documentation - QUALIFY", url: "https://docs.snowflake.com/ja/sql-reference/constructs/qualify" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>以下のサンプルテーブルがあります</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">CLASS</TableHead>
            <TableHead className="text-center">NAME</TableHead>
            <TableHead className="text-center">SCORE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>A</TableCell>
            <TableCell>Alice</TableCell>
            <TableCell>95</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>A</TableCell>
            <TableCell>Bob</TableCell>
            <TableCell>85</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>B</TableCell>
            <TableCell>Charlie</TableCell>
            <TableCell>90</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>4</TableCell>
            <TableCell>B</TableCell>
            <TableCell>David</TableCell>
            <TableCell>88</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>5</TableCell>
            <TableCell>C</TableCell>
            <TableCell>Eve</TableCell>
            <TableCell>92</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>6</TableCell>
            <TableCell>C</TableCell>
            <TableCell>Frank</TableCell>
            <TableCell>89</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p className="py-4">次のSQLを実行した結果として正しいものを選択してください</p>
      <SQLCodeBlock />
    </div>
  );
}

const code = `SELECT name
FROM sample_table
QUALIFY ROW_NUMBER() OVER (PARTITION BY class ORDER BY score DESC) = 1;`;

function SQLCodeBlock() {
  return (
    <CodeBlock code={code} showLineNumbers={false} />
  );
}


function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>QUALIFY 句は、ウィンドウ関数の結果のフィルタリングを必要とするクエリを簡素化します。 QUALIFYがない場合、フィルタリングにはネストが必要です。</p>
      <p>今回の問題は、クラスごとのトップスコアを取得するために、QUALIFY句を使用している例でした。</p>
      <p>QUALIFYを利用しなくても同じ結果を得る方法はありますが、あなたはどう書くのが好みでしょうか？</p>
    </div>
  );
} 
