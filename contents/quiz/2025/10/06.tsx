import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Governance", "Data Storage", "Snowflake Basic"],
    created_at: new Date("2025-10-06"),
    updated_at: new Date("2025-10-06"),

    // ----- quiz -----
    title: "Time Travelの保持期間設定",
    question_jsx: <QuizQuestion />,
    options: {
      0: "アカウントで DATA_RETENTION_TIME_IN_DAYS を 0 に設定すると、すべてのデータベースで Time Travel を完全に無効化し、テーブル単位で値を上書きすることはできない。",
      1: "テーブルで DATA_RETENTION_TIME_IN_DAYS を明示的に設定すると、その値は親スキーマやデータベースよりも優先される。",
      2: "一時テーブル（transient table）でも DATA_RETENTION_TIME_IN_DAYS に 30 日を設定できるが、Fail-safe だけは利用できない。",
      3: "Standard Edition でも DATA_RETENTION_TIME_IN_DAYS に 45 日を指定できるが、Fail-safe 期間の延長には追加契約が必要になる。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Time Travelの理解と使用 | Snowflake ドキュメント",
        url: "https://docs.snowflake.com/ja/user-guide/data-time-travel",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowflakeのTime Travel機能で利用する保持期間パラメーター
        <code>DATA_RETENTION_TIME_IN_DAYS</code>
        に関する説明として、
        <strong className="text-green-600">正しいもの</strong>
        はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-green-600">Correct statement:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          テーブルで <code>DATA_RETENTION_TIME_IN_DAYS</code> を明示的に設定すると、その値がスキーマやデータベースで継承された値より優先されます。アカウント→データベース→スキーマ→テーブルの優先順位で上書きできるため、対象テーブルだけ保持期間を延長する細かな制御が可能です。
        </li>
      </ul>
      <p className="font-semibold text-red-500">Incorrect statements (answer):</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          アカウントレベルで <code>DATA_RETENTION_TIME_IN_DAYS</code> を 0 にしても、下位オブジェクトで別の値を設定して Time Travel を再度有効化できます。
        </li>
        <li>
          一時テーブルの保持期間は最大 1 日のため 30 日には設定できず、Fail-safe も利用できません。
        </li>
        <li>
          Standard Edition の保持期間は最大 1 日で、45 日を設定できるのは Enterprise Edition 以上です。Fail-safe の期間も Standard Edition では延長できません。
        </li>
      </ul>
    </div>
  );
}
