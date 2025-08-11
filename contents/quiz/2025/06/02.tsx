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
    tags: ["Data Retention", "Snowflake", "Snowflake Basic", "Time Travel"],
    created_at: new Date("2025-06-02"),
    updated_at: new Date("2025-06-02"),

    // ----- quiz -----
    title: "Snowflake Time Travelのデータ保持期間と動作",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Snowflake Standard Editionでは、永続的なテーブルのデータ保持期間を0日または1日に設定できる。",
      1: "データ保持期間を例えば10日から1日に短縮するよう指示した場合、その変更指示後、バックグラウンドプロセスによる処理が完了し次第、1日を超え10日以内の履歴データはTime Travelによるアクセスができなくなる。",
      2: "UNDROP コマンドを使用すると、Time Travelの保持期間が終了した後でも、Fail-safe期間中であればオブジェクトを復元できる。",
      3: "Time Travel SQL拡張の AT | BEFORE句では、TIMESTAMP、OFFSET、STATEMENT（クエリID）のいずれかを使用して履歴データを指定できる。",
      4: "アカウント全体のデフォルトデータ保持期間は MIN_DATA_RETENTION_TIME_IN_DAYS パラメータで設定する。",
    },
    answers: [0, 1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Time Travelの理解と使用 - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/data-time-travel"
      }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのTime Travel機能に関する記述のうち、正しいものを全て選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflake Time Travelの各機能に関する解説は以下の通りです。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-emerald-500">Snowflake Standard Editionでは、永続的なテーブルのデータ保持期間を0日または1日に設定できる。</strong>：
          これは正しい記載です。Snowflake Standard Editionの場合、データ保持期間は0日（Time Travel無効）またはデフォルトの1日に設定できます。Enterprise Edition以上では、永続オブジェクトに対して最大90日まで設定可能です。
        </li>
        <li>
          <strong className="text-emerald-500">データ保持期間を例えば10日から1日に短縮するよう指示した場合、その変更指示後、バックグラウンドプロセスによる処理が完了し次第、1日を超え10日以内の履歴データはTime Travelによるアクセスができなくなる。</strong>：
          これは正しい記載です。データ保持期間が変更されると、新しい保持期間が適用されます。期間を短縮した場合、新しい保持期間を超える履歴データはTime Travelの対象外となり、Fail-safeに移行します（または完全に削除されます）。なお、データ保持期間の変更はシステム内部のバックグラウンドプロセスによって非同期に実行されるため、指示から実際の反映までには多少のタイムラグが発生する場合があります。
        </li>
        <li>
          <strong className="text-red-500">UNDROP コマンドを使用すると、Time Travelの保持期間が終了した後でも、Fail-safe期間中であればオブジェクトを復元できる。</strong>：
          これは誤った記載です。UNDROPコマンドは、Time Travelのデータ保持期間内に存在するドロップされたオブジェクトを復元するためのものです。保持期間が終了したデータはFail-safeに移行し、Fail-safeからのデータ復旧はSnowflakeサポートを通じてのみ可能です。
        </li>
        <li>
          <strong className="text-emerald-500">Time Travel SQL拡張の AT | BEFORE句では、TIMESTAMP、OFFSET、STATEMENT（クエリID）のいずれかを使用して履歴データを指定できる。</strong>：
          これは正しい記載です。SELECTステートメントやCREATE ... CLONEコマンドでAT | BEFORE句を使用する際、TIMESTAMP（特定のタイムスタンプ）、OFFSET（現在時刻からの秒単位の差）、STATEMENT（クエリID）のいずれかのパラメータで履歴データの時点を指定できます。
        </li>
        <li>
          <strong className="text-red-500">アカウント全体のデフォルトデータ保持期間は MIN_DATA_RETENTION_TIME_IN_DAYS パラメータで設定する。</strong>：
          これは誤った記載です。アカウントのデフォルトデータ保持期間は DATA_RETENTION_TIME_IN_DAYS パラメータで設定します。MIN_DATA_RETENTION_TIME_IN_DAYS はアカウント内のオブジェクトが設定できるデータ保持期間の最小値を設定するためのものであり、これを下回る値に DATA_RETENTION_TIME_IN_DAYS を設定しようとしても、この最小値が適用されます。
        </li>
      </ul>
      <p className="pt-4">
        <strong>補足</strong>：
        <br />
        Time Travelは誤操作からのデータリカバリや過去データ分析に非常に強力な機能です。データ保持期間の設定は、ストレージコストとデータ保護の要件のバランスを考慮して決定することが重要です。特に期間を短縮する際には、アクセスできなくなる履歴データ範囲を正確に把握する必要があります。
      </p>
    </div>
  );
} 
