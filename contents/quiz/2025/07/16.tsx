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
    created_at: new Date("2025-07-16"),
    updated_at: new Date("2025-07-16"),

    // ----- quiz -----
    title: "Snowflake LPAD関数の出力結果",
    question_jsx: <QuizQuestion />,
    options: {
      0: "*****Hello",
      1: "Hello*****",
      2: "****Hello*",
      3: "Hello*****",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "LPAD - Snowflake Documentation", url: "https://docs.snowflake.com/ja/sql-reference/functions/lpad" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-2">
        Snowflakeの<strong>LPAD関数</strong>を使用して文字列の左側にパディングを行います。
        以下のSQLクエリを実行した場合の出力結果を選んでください。
      </p>
      <CodeBlock 
        code={`-- サンプルテーブル
CREATE OR REPLACE TABLE string_example (
    id INT,
    text_value VARCHAR(20)
);

INSERT INTO string_example VALUES
(1, 'Hello'),
(2, 'World'),
(3, 'Test');

-- LPAD関数を使用したクエリ
SELECT 
    text_value,
    LPAD(text_value, 10, '*') AS padded_result
FROM string_example
WHERE id = 1;`}
        showLineNumbers={false}
      />
      <p className="py-2">
        上記のクエリを実行した場合、<strong className="text-emerald-500">padded_result列の出力結果</strong>はどれになりますか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        正解は <strong className="text-emerald-500">*****Hello</strong> です。
      </p>
      
      <p className="py-2">
        <strong>LPAD関数の動作：</strong>
      </p>
      <CodeBlock 
        code={`LPAD(text_value, 10, '*')
-- text_value = 'Hello' (5文字)
-- 目標長 = 10文字
-- パディング文字 = '*'`}
        showLineNumbers={false}
      />
      
      <p className="py-2">
        <strong>計算過程：</strong>
      </p>
      <ul className="list-disc pl-4">
        <li>元の文字列「Hello」は5文字</li>
        <li>目標長は10文字</li>
        <li>必要なパディング文字数：10 - 5 = 5文字</li>
        <li>左側に「*」を5個追加</li>
        <li>結果：「*****Hello」（左側に5個の* + Hello）</li>
      </ul>
      
      <p className="py-2">
        <strong>各選択肢の解説：</strong>
      </p>
      
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong className="text-emerald-500">*****Hello：</strong> 正解
          <br />
          左側に5個の*を追加して10文字にした正しい結果です。
        </li>
        
        <li className="pb-2">
          <strong>Hello*****：</strong> 誤答
          <br />
          これはRPAD（右側パディング）の結果です。LPADは左側にパディングを行います。
        </li>
        
        <li className="pb-2">
          <strong>****Hello*：</strong> 誤答
          <br />
          パディング文字数が間違っています。5文字のパディングが必要ですが、4文字しかありません。
        </li>
        
        <li className="pb-2">
          <strong>Hello*****：</strong> 誤答
          <br />
          選択肢1と同じで、RPADの結果です。LPADは左側パディングです。
        </li>
      </ul>
      
      <p className="py-2">
        <strong>LPAD関数の構文：</strong>
      </p>
      <CodeBlock 
        code={`LPAD(base, length_expr [, pad])

-- パラメータ：
-- base: パディング対象の文字列
-- length_expr: 目標の文字数
-- pad: パディングに使用する文字（省略時は空白）`}
        showLineNumbers={false}
      />
      
      <p className="py-2">
        <strong>実用的な使用例：</strong>
      </p>
      <CodeBlock 
        code={`-- 商品コードのゼロパディング
SELECT 
    product_name,
    LPAD(product_code, 8, '0') AS formatted_code
FROM products;

-- 結果例：
-- product_name   | formatted_code
-- ---------------|----------------
-- ノートPC        | 00001234
-- マウス          | 00000056`}
        showLineNumbers={false}
      />
      
      <p className="py-2">
        <strong>重要なポイント：</strong>
      </p>
      <ul className="list-disc pl-4">
        <li>LPADは左側（Left）にパディングを行う</li>
        <li>目標長に達するまでパディング文字を繰り返す</li>
        <li>元の文字列が目標長より長い場合は切り詰められる</li>
        <li>パディング文字を省略すると空白が使用される</li>
      </ul>
    </div>
  );
}