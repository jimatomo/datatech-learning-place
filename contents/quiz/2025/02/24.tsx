import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Basic"],
    created_at: new Date("2025-02-24"),
    updated_at: new Date("2025-02-24"),

    // ----- quiz -----
    title: "Snowflakeの永続的なクエリ結果",
    question_jsx: <QuizQuestion />,
    options: {
      0: "永続的なクエリ結果は、デフォルトで24時間後に自動的に削除される",
      1: "永続的なクエリ結果は、クエリを実行したユーザーのみがアクセス可能だが、ACCOUNTADMINだけは例外的にアクセスが可能である",
      2: "永続的なクエリ結果は、元のクエリで使用したウェアハウスのクレジットを消費する",
      3: "永続的なクエリ結果は、常に最新のデータを反映するように自動更新される",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "永続的なクエリ結果の使用", url: "https://docs.snowflake.com/en/user-guide/querying-persisted-results" },
      { title: "RESULT_SCAN", url: "https://docs.snowflake.com/en/sql-reference/functions/result_scan" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeでは、クエリ結果を永続化して後で再利用することができます。
        永続的なクエリ結果に関する以下の説明のうち、正しいものを選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeの永続的なクエリ結果に関する問題です。
      </p>
      <p className="pt-2">
        それぞれの選択肢について説明します：
      </p>
      <ul className="list-disc pl-6 pt-2">
        <li className="pb-2">
          永続的なクエリ結果は、デフォルトで24時間後に自動的に削除されます。
          大きな永続的なクエリ結果 (サイズが 100 KB を超えるもの) は例外で、
          クエリ結果にアクセスするために使用されるセキュリティトークンは6時間後に期限切れになることに注意してください。
        </li>
        <li className="pb-2">
          永続的なクエリ結果は、元のクエリを手動で実行する場合、元のクエリを実行したユーザーのみが RESULT_SCAN 関数を使用してクエリの出力を処理できます。
          ACCOUNTADMIN 権限を持つユーザーであっても、RESULT_SCANを呼び出して別のユーザーのクエリの結果にアクセスすることはできません。
        </li>
        <li className="pb-2">
          永続的なクエリ結果を利用できる際（前回のクエリ実行以降に基となるテーブルのデータが変更されていない場合）には、
          クエリを再度実行する代わりに、Snowflake は以前返したのと同じ結果を返します。
          これにより、Snowflake はクエリの実行をバイパスし、代わりにキャッシュから直接結果を取得するため、クエリ時間を大幅に短縮できます。
          ウェアハウスは使用しません。
        </li>
        <li>
          永続的なクエリ結果は、実行時点のデータのスナップショットです。
          基となるテーブルのデータが変更されても、クエリ結果は更新されません。
          最新のデータが必要な場合は、永続的なクエリ結果は利用させずに通常通りウェアハウスを利用してクエリが実行されます。
        </li>
      </ul>
      <p className="pt-2">
        永続的なクエリ結果は、大規模なクエリの結果を再利用したりすることで、コストを抑えることができます。
        クエリの文字列が完全一致するなど細かい条件が他にもいくつかありますので、一度ドキュメントを読んでおくといいでしょう。
        例えば、小文字と大文字、またはテーブル エイリアスの使用など、構文に違いがあると利用されません。
      </p>
    </div>
  );
} 

