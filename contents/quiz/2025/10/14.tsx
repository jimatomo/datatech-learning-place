import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
// (No code block sample; quiz focuses on when to use SQL API.)

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "SQL", "Data Application", "Snowflake Advanced"],
    created_at: new Date("2025-10-14"),
    updated_at: new Date("2025-10-14"),

    // ----- quiz -----
    title: "Snowflake SQL API はどんな場面で使う？",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ドライバを配置できないサーバーレス/外部SaaS連携から HTTPS 経由で SQL を実行し、必要に応じて非同期でポーリング取得したいときに適している。",
      1: "ステージへの PUT/GET を SQL API 単体で実行してファイル転送まで完結できるため、大規模なファイル取り込みに最適である。",
      2: "ミリ秒オーダーの超低遅延ストリーミング書き込み（行単位連続投入）の主要手段として最適である。",
      3: "ネットワークが不安定な環境では同一リクエストの重複実行を避ける仕組みがないため、SQL API の利用は避けるべきである。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Introduction to the SQL API | Snowflake Documentation", url: "https://docs.snowflake.com/en/developer-guide/sql-api/intro" },
      { title: "Snowflake SQL API reference. | Snowflake Documentation", url: "https://docs.snowflake.com/en/developer-guide/sql-api/reference" },
      { title: "Submitting a request to execute SQL statements | Snowflake Documentation", url: "https://docs.snowflake.com/en/developer-guide/sql-api/submitting-requests" },
      { title: "Handling responses | Snowflake Documentation", url: "https://docs.snowflake.com/en/developer-guide/sql-api/handling-responses" },
      { title: "Using programmatic access tokens for authentication | Snowflake Documentation", url: "https://docs.snowflake.com/en/user-guide/programmatic-access-tokens" },
      { title: "Snowpipe Streaming | Snowflake Documentation", url: "https://docs.snowflake.com/en/user-guide/data-load-snowpipe-streaming-overview" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflake の SQL API は、REST（HTTPS）経由で SQL を実行・結果取得できるエンドポイントです。必要に応じて
        <code>async=true</code> で非同期実行し、ステートメントハンドルをポーリングして結果を取得できます。
      </p>
      <p>
        SQL API の<strong className="text-green-600">利用に適した場面</strong>として、
        <strong className="text-green-600">正しいもの</strong>を 1 つ選んでください。
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
          ドライバ不要で HTTPS 越しに SQL を実行でき、<code>async=true</code> や 45 秒超の実行時はステートメントハンドル（HTTP 202）を受け取り
          ステータス API でポーリングして結果取得できます。軽量な外部連携やサーバーレス実装に向いています。
        </li>
      </ul>
      <p className="font-semibold text-red-500">Incorrect statements (why they are wrong):</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          SQL API は <code>PUT</code>/<code>GET</code> を<strong>サポートしません</strong>。ファイル転送の完結用途には不適です（別手段が必要）。
        </li>
        <li>
          超低遅延の行ベース連続取り込みには <strong>Snowpipe Streaming</strong>（または対応 SDK/コネクタ）が適しています。SQL API はクエリ実行・結果取得が主眼です。
        </li>
        <li>
          SQL API には <code>requestId</code> と <code>retry=true</code> による<strong>冪等な再送</strong>の仕組みがあり、ネットワーク障害時の重複実行防止に使えます。
        </li>
      </ul>
      <p>補足:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          認証は OAuth、キーペア JWT、または <strong>PAT（Programmatic Access Token）</strong> が利用できます。<code>Authorization: Bearer</code> と必要に応じて
          <code>X-Snowflake-Authorization-Token-Type</code> ヘッダーを設定します。
        </li>
      </ul>
    </div>
  );
}
