import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["SQL", "Data Modeling", "Snowflake"],
    created_at: new Date("2025-03-05"),
    updated_at: new Date("2025-03-05"),

    // ----- quiz -----
    title: "Snowflakeの日付関数と日付データ型について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "DATEADD関数の第一引数には日付部分を表す文字列（'day', 'month'など）を指定し、大文字小文字は区別される",
      1: "TIMESTAMPデータ型は日付と時刻の両方を格納するが、タイムゾーン情報は保持できない",
      2: "DATEADD('year', 1, DATE '2024-02-29')の結果は'2025-02-28'となる",
      3: "Snowflakeでは日付リテラルを DATE '2024-03-05' のように指定できるが、時刻リテラルは指定できない",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "日付、時刻、およびタイムスタンプのデータ型", url: "https://docs.snowflake.com/ja/sql-reference/data-types-datetime" },
      { title: "DATEADD関数", url: "https://docs.snowflake.com/ja/sql-reference/functions/dateadd" },
      { title: "日付と時刻の関数", url: "https://docs.snowflake.com/ja/sql-reference/functions-date-time" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Snowflakeの日付関数と日付データ型に関する以下の記述のうち、正しいものを選択してください。
      </span>
    </div>
  );
}

const sample_code_dateadd = `-- DATEADD関数の基本的な使い方
SELECT 
  DATEADD('day', 1, CURRENT_DATE()) AS tomorrow,
  DATEADD('month', -1, CURRENT_DATE()) AS last_month,
  DATEADD('year', 1, CURRENT_DATE()) AS next_year;

-- うるう年の処理
SELECT 
  DATE '2024-02-29' AS leap_day,
  DATEADD('year', 1, DATE '2024-02-29') AS one_year_later;
-- 結果: 2024-02-29, 2025-02-28`

const sample_code_date_types = `-- 日付データ型の例
CREATE TABLE date_examples (
  date_value DATE,
  time_value TIME,
  timestamp_value TIMESTAMP,
  '2024-03-05 13:30:46 +0900'::TIMESTAMP_TZ
);

-- 日付リテラルの使用例
INSERT INTO date_examples VALUES (
  DATE '2024-03-05',
  TIME '13:30:45',
  TIMESTAMP '2024-03-05 13:30:45',
  TIMESTAMP_TZ '2024-03-05 13:30:45 +09:00'
);`

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeには日付と時刻を扱うための様々なデータ型と関数が用意されています。
      </p>
      <p className="py-2">
        日付データ型の主な種類：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2"><strong>DATE</strong>: 日付のみを格納（年、月、日）</li>
        <li className="pb-2"><strong>TIME</strong>: 時刻のみを格納（時、分、秒、小数秒）</li>
        <li className="pb-2"><strong>TIMESTAMP</strong>: 日付と時刻を格納するが、タイムゾーン情報は含まない</li>
        <li className="pb-2"><strong>TIMESTAMP_LTZ</strong>: ローカルタイムゾーン付きのタイムスタンプ</li>
        <li className="pb-2"><strong>TIMESTAMP_NTZ</strong>: タイムゾーンなしのタイムスタンプ</li>
        <li className="pb-2"><strong>TIMESTAMP_TZ</strong>: タイムゾーン付きのタイムスタンプ</li>
      </ul>
      <p className="py-2">
        日付リテラルと時刻リテラルの例：
      </p>
      <CodeBlock showLineNumbers={false} code={sample_code_date_types} />
      <p className="py-2">
        DATEADD関数について：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">DATEADD関数は指定された日付部分（日、月、年など）に指定された数値を加算します</li>
        <li className="pb-2">第一引数には日付部分を表す文字列を指定しますが、大文字小文字は区別されません（&apos;DAY&apos;も&apos;day&apos;も同じ）</li>
        <li className="pb-2">うるう年の2月29日に1年を加算すると、翌年の2月28日になります（2月29日が存在しない場合）</li>
        <li className="pb-2">負の値を指定すると、日付から減算されます</li>
      </ul>
      <p className="py-2">
        DATEADD関数の使用例：
      </p>
      <CodeBlock showLineNumbers={false} code={sample_code_dateadd} />      
      <p className="py-2">
        選択肢の解説：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">DATEADD関数の第一引数は大文字小文字を区別しません。</li>
        <li className="pb-2">TIMESTAMPデータ型にはTIMESTAMP_TZなどのバリエーションがあり、タイムゾーン情報を保持できます。</li>
        <li className="pb-2">うるう年の2月29日に1年を加算すると、翌年の2月28日になります。</li>
        <li className="pb-2">Snowflakeでは時刻リテラルも TIME &apos;13:30:45&apos; のように指定できます。</li>
      </ul>
    </div>
  );
} 
