import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Account", "Administration"],
    created_at: new Date("2025-01-02"),
    updated_at: new Date("2025-01-02"),

    // ----- quiz -----
    title: "Snowflakeのアカウント識別子",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "組織名とアカウント名を使用する形式（例: orgname-accountname）", 
      1: "IPアドレスを使用する形式", 
      2: "アカウントロケーターを使用する形式（例: xy12345.region.cloud）", 
      3: "ドメイン名を使用する形式", 
      4: "Snowflakeサービスへのプライベート接続が有効になっており、この機能を使用してSnowflakeに接続する場合に利用する SYSTEM$GET_PRIVATELINK_CONFIG 関数から取得したプライベート接続URL"
    },
    answers: [0, 2, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "アカウント識別子", url: "https://docs.snowflake.com/ja/user-guide/admin-account-identifier" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>Snowflakeアカウントに接続するために使用できるURLはどれですか？</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>Snowflakeアカウントを識別するために使用できる形式は以下の2つです：</p>
      <ul className="py-2 space-y-2">
        <li>・<strong>形式1（推奨）: 組織内のアカウント名</strong>
          <br />例: orgname-accountname
          <br />これは推奨される形式で、アカウントの名前とその組織が含まれます。</li>
        <li>・<strong>形式2（レガシー）: リージョン内のアカウントロケーター</strong>
          <br />例: xy12345.region.cloud
          <br />これは従来の形式で、アカウントロケーター、クラウドリージョンID、クラウドプラットフォームの識別子が含まれる場合があります。</li>
      </ul>
      <p>組織名とアカウント名を使用する形式は、より直感的で管理しやすいため推奨されています。アカウントロケーターを使用する形式は引き続きサポートされていますが、推奨される方法ではなくなりました。</p>
      <p className="pt-2">
        アカウントでSnowflakeサービスへのプライベート接続が有効になっており、この機能を使用してSnowflakeに接続する場合は、
        <a href="https://docs.snowflake.com/ja/sql-reference/functions/system_get_privatelink_config" target="_blank" rel="noopener noreferrer"
          className="underline">
          SYSTEM$GET_PRIVATELINK_CONFIG 関数
        </a>
        を実行して、使用するプライベート接続 URL を決定します。
        URL のアカウント名またはアカウントロケーターのいずれかを使用して、Snowflakeウェブインターフェイスに接続できます。
      </p>
    </div>
  );
}
