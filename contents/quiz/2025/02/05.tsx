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
    tags: ["Snowflake", "FLATTEN", "LATERAL"],
    created_at: new Date("2025-02-05"),
    updated_at: new Date("2025-02-05"),

    // ----- quiz -----
    title: "lateralキーワードとflattenの使い方",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "lateral flatten(input => s.body, path => 'tags') f",
      1: "lateral flatten(input => s.body:tags) f",
      2: "lateral flatten(s.body:tags) f",
      3: "lateral flatten(s.body) f",
      4: "flatten(s.body:tags) f"
    },
    answers: [0, 1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "LATERAL with FLATTEN", url: "https://docs.snowflake.com/ja/sql-reference/constructs/join-lateral#example-of-using-lateral-with-flatten" },
      { title: "FLATTEN Function", url: "https://docs.snowflake.com/ja/sql-reference/functions/flatten" }
    ],
  });
  return quiz;
}

// SQLコード
const sql_code = `with sample_table as (
  select
    parse_json(column1) as body
  from values
    ('{
      "id": 1,
      "title": "datatech-learning-place",
      "tags": ["Next.js", "AWS"]
    }')
)

select
  s.body:id::integer as id,
  s.body:title::string as title,
  f.value::string as tag
from sample_table s,
  ＜ここを埋めてください＞;
`;

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        下記のSQLコードを実行すると表のような結果が返ってきました。SQLの空白部分として正しい式を選択してください。
      </p>
      <CodeBlock code={sql_code} showLineNumbers={false} highlightedLines={[{ line: 17, type: 'none' }]} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">id</TableHead>
            <TableHead className="text-center">title</TableHead>
            <TableHead className="text-center">tag</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>datatech-learning-place</TableCell>
            <TableCell>Next.js</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>datatech-learning-place</TableCell>
            <TableCell>AWS</TableCell>
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
        今回は、LATERALキーワードとFLATTEN関数を使用して、JSONデータのtagsフィールドを展開して縦持ちの表形式に変換しています。
      </p>
      <p className="pt-2">
        ポイントは以下の通りです：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          FLATTENは配列やオブジェクトを複数の行に展開するテーブル関数です。
          入力として VARIANT、OBJECT、または ARRAY 型のデータを受け取ります。
        </li>
        <li>
          PATH パラメータを使用する場合は、展開したい要素へのパスを指定します。
          この場合、&apos;tags&apos;を指定することで、body内のtagsフィールドを展開します。
        </li>
        <li>
          コロン記法を使用して直接配列にアクセスすることもできます。
          s.body:tagsは配列を直接参照するため、同様の結果が得られます。
        </li>
      </ul>
      <p className="mt-2">
        誤った選択肢の解説：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          body自体を渡すと、tagsフィールドが展開されないので、意図した結果は得られません。
        </li>
        <li>
          LATERALキーワードを使用しないとラテラル結合の処理がされずに式を参照できないのでシンタックスエラーになります。
        </li>
      </ul>
    </div>
  );
} 

