import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
// CodeBlockをインポートしましたが、利用箇所がないため削除します
// import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data History", "Snowflake", "Snowflake Basic", "Time Travel"],
    created_at: new Date("2025-06-23"),
    updated_at: new Date("2025-06-23"),

    // ----- quiz -----
    title: "Snowflakeの履歴データアクセス機能",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Snowpipe",
      1: "Time Travel",
      2: "Streams",
      3: "Tasks",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Time Travel & Fail-safe - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/data-time-travel"
      },
      {
        title: "Time Travelの使用 - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/sql-reference/constructs/at-before"
      }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeでデータが変更されたり、削除されたりした履歴データを指定した期間アクセスできる機能は何ですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeの履歴データアクセス機能について、各選択肢の説明と正解の理由を説明します。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong>Snowpipe</strong>：
          これはSnowflakeの継続的なデータロード機能です。ステージングされたファイルを自動的にテーブルにロードする機能であり、履歴データへのアクセス機能ではありません。
        </li>
        <li>
          <strong className="text-emerald-500">Time Travel</strong>：
          これが正しい答えです。Time Travelは、テーブル、スキーマ、データベース内のデータの変更や削除の履歴にアクセスできるSnowflakeの重要な機能です。デフォルトで1日間（Standard版）、最大90日間（Enterprise版以上）の履歴データにアクセス可能で、<code>AT</code>や<code>BEFORE</code>句を使用して特定の時点のデータを参照できます。誤って削除したデータの復旧や、特定時点でのデータ分析に非常に有用です。
        </li>
        <li>
          <strong>Streams</strong>：
          これはテーブルに対するDML変更（INSERT、UPDATE、DELETE）を追跡する機能です。変更データキャプチャ（CDC）の仕組みを提供しますが、履歴データそのものにアクセスする機能ではありません。
        </li>
        <li>
          <strong>Tasks</strong>：
          これはSnowflake内でSQL文やストアドプロシージャを定期的に実行するスケジューリング機能です。履歴データへのアクセスとは直接関係ありません。
        </li>
      </ul>
      <p className="pt-2">
        Time Travelを使用することで、<code>SELECT * FROM my_table AT(TIMESTAMP =&gt; &#39;2025-06-22 10:00:00&#39;::timestamp)</code>のような構文で過去の特定時点のデータを参照できます。
      </p>
    </div>
  );
} 
