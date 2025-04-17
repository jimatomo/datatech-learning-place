import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "SQL", "Snowflake Basic"],
    created_at: new Date("2025-04-14"),
    updated_at: new Date("2025-04-14"),

    // ----- quiz -----
    title: "SnowflakeのFLATTEN関数の動作",
    question_jsx: <QuizQuestion />,
    options: {
      0: "結果セットには4行のデータが含まれる",
      1: "各ユーザーの連絡先情報が1行にまとめられている",
      2: "ビジネス連絡先のタイプと内容が別々の行に展開されている",
      3: "結果セットには8行のデータが含まれる",
    },
    answers: [0,2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { 
        title: "FLATTEN - Snowflake Documentation", 
        url: "https://docs.snowflake.com/ja/sql-reference/functions/flatten"
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  const createTable = `CREATE OR REPLACE TABLE persons AS
SELECT column1 as id, parse_json(column2) as c
FROM values
  (12712555,
  '{ name:  { first: "John", last: "Smith"},
    contact: [
    { business:[
      { type: "phone", content:"555-1234" },
      { type: "email", content:"j.smith@example.com" } ] } ] }'),
  (98127771,
  '{ name:  { first: "Jane", last: "Doe"},
    contact: [
    { business:[
      { type: "phone", content:"555-1236" },
      { type: "email", content:"j.doe@example.com" } ] } ] }') v;`;

  const query = `SELECT id as "ID",
  f.value AS "Contact",
  f1.value:type AS "Type",
  f1.value:content AS "Details"
FROM persons p,
  lateral flatten(input => p.c, path => 'contact') f,
  lateral flatten(input => f.value:business) f1;`;

  return (
    <div>
      <p className="pb-4">
        以下のテーブルとデータが存在する場合、実行されるクエリの結果について、正しい説明を2つ選んでください。
      </p>
      <div className="pb-4">
        <p className="font-bold pb-2">テーブル定義とサンプルデータ：</p>
        <CodeBlock code={createTable} />
      </div>
      <div>
        <p className="font-bold pb-2">実行クエリ：</p>
        <CodeBlock code={query} />
      </div>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        FLATTEN関数は、半構造化データをリレーショナル表現に変換するための重要な関数です。このクエリでは2つのLATERAL FLATTENが使用されており、以下のように動作します：
      </p>
      <p className="py-2">
        <strong>クエリの動作</strong>：
        <ul className="list-disc pl-4">
          <li>最初のFLATTENでcontact配列を展開</li>
          <li>2番目のFLATTENでbusiness配列を展開</li>
          <li>結果として、各ユーザーの連絡先情報が複数行に展開される</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>結果の特徴</strong>：
        <ul className="list-disc pl-4">
          <li>各ユーザー（ID）に対して、ビジネス連絡先の各要素（phoneとemail）が別々の行に展開される</li>
          <li>2人のユーザー × 2つの連絡先タイプ（phoneとemail）で、合計4行の結果が得られる</li>
          <li>Type列には連絡先の種類（&quot;phone&quot;または&quot;email&quot;）が表示される</li>
          <li>Details列には実際の連絡先情報（電話番号やメールアドレス）が表示される</li>
        </ul>
      </p>
      <p className="py-2">
        実務では基本的に各カラムを適切なデータ型にキャストしたりすることが多いです。
      </p>
    </div>
  );
} 
