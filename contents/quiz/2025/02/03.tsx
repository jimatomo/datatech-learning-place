import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Stage", "File Functions", "SQL"],
    created_at: new Date("2025-02-03"),
    updated_at: new Date("2025-02-03"),

    // ----- quiz -----
    title: "SnowflakeのStageファイル関数について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "GET_PRESIGNED_URL 関数は、指定された stage 上のファイルに対して、短期間（デフォルトは3600秒）のアクセスを提供する事前署名付き URL を生成する。",
      1: "BUILD_SCOPED_FILE_URL 関数は、エンコードされた scoped URL を生成し、クエリ結果がキャッシュされる期間（通常24時間）有効な URL を返す。",
      2: "BUILD_STAGE_FILE_URL 関数は、期限切れにならないファイル URL を生成し、REST API を介してファイルへの長期間のアクセスを可能にする。",
      3: "GET_PRESIGNED_URL 関数は、生成された URL の有効期限が切れても、常に stage 上のファイルにアクセスできる。",
      4: "BUILD_SCOPED_FILE_URL 関数は、ビジネスクリティカルアカウントでは 'privatelink' セグメントが追加される。"
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "GET_PRESIGNED_URL", url: "https://docs.snowflake.com/en/sql-reference/functions/get_presigned_url" },
      { title: "BUILD_SCOPED_FILE_URL", url: "https://docs.snowflake.com/en/sql-reference/functions/build_scoped_file_url" },
      { title: "BUILD_STAGE_FILE_URL", url: "https://docs.snowflake.com/en/sql-reference/functions/build_stage_file_url" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span className="break-all">
        Snowflake の stage 上でのファイルアクセスに利用されるファイル関数（GET_PRESIGNED_URL、BUILD_SCOPED_FILE_URL、BUILD_STAGE_FILE_URL）について、
        <span className="text-red-500">正しくない説明</span>を選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        選択肢3が誤りです。GET_PRESIGNED_URL 関数は、有効期限（デフォルト3600秒）が切れると URL のアクセスが無効となるため、生成後も常にアクセスできるわけではありません。
      </p>

      <p className="mt-2">
        各関数の特徴と使い分けは以下の通りです：
      </p>

      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          <span className="font-bold">GET_PRESIGNED_URL：</span>
          一時的なアクセスが必要な場合に使用します。セキュリティ上の理由から有効期限が設定され、
          期限切れ後はアクセスできなくなります。外部ユーザーと一時的にファイルを共有する際に適しています。
        </li>
        <li className="pb-1">
          <span className="font-bold">BUILD_SCOPED_FILE_URL：</span>
          クエリ結果のキャッシュ期間（通常24時間）内で有効な URL を生成します。
          同じクエリが再実行された場合、キャッシュされた結果を利用できるため、
          パフォーマンスが向上します。
        </li>
        <li className="pb-1">
          <span className="font-bold">BUILD_STAGE_FILE_URL：</span>
          期限切れしない永続的な URL を生成します。REST API を介した長期的なファイルアクセスが
          必要な場合に使用します。ただし、適切なアクセス制御の設定が重要です。
        </li>
      </ul>

      <p className="mt-2">
        セキュリティの観点から、必要最小限の期間だけアクセスを許可することが推奨されます。
        そのため、用途に応じて適切な関数を選択することが重要です。
      </p>
    </div>
  );
} 
