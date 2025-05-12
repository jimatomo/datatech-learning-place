import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "Authentication", "Programmatic Access Token", "Snowflake Advanced"],
    created_at: new Date("2025-05-13"),
    updated_at: new Date("2025-05-13"),

    // ----- quiz -----
    title: "SnowflakeのProgrammatic Access Tokenについて",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Programmatic Access Tokenは、Snowflake REST API、Snowflake SQL API、Snowflake Catalog SDKへの認証に使用できる。",
      1: "Programmatic Access Tokenは、SnowflakeドライバやSnowflake CLI (SnowSQL) でパスワードの代わりに使用できる。",
      2: "Programmatic Access Tokenの有効期限は、生成後に変更することができる。",
      3: "Programmatic Access Tokenを生成または使用するには、デフォルトではサービスユーザー（TYPE=SERVICE）がネットワークポリシーの対象である必要がある。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Using programmatic access tokens for authentication - Snowflake Documentation", url: "https://docs.snowflake.com/en/user-guide/programmatic-access-tokens" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのProgrammatic Access Token (PAT) に関する説明として、<strong className="text-red-500">誤っているもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Programmatic Access Token (PAT) は、Snowflakeの各種APIやクライアントへのプログラムによるアクセスを安全に行うための認証方法です。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>Programmatic Access Tokenは、Snowflake REST API、Snowflake SQL API、Snowflake Catalog SDKへの認証に使用できる。:</strong>
          <br />
          これは正しい説明です。ドキュメントには「To authenticate to the following Snowflake endpoints, you can use a programmatic access token: Snowflake REST APIs. The Snowflake SQL API. The Snowflake Catalog SDK.」と記載されています。
        </li>
        <li className="pt-2">
          <strong>Programmatic Access Tokenは、SnowflakeドライバやSnowflake CLI (SnowSQL) でパスワードの代わりに使用できる。:</strong>
          <br />
          これは正しい説明です。ドキュメントには「You can also use a programmatic access token as a replacement for a password in the following: Snowflake drivers. ... Snowflake command-line clients (such as the Snowflake CLI and SnowSQL).」と記載されています。
        </li>
        <li className="pt-2">
          <strong>Programmatic Access Tokenを生成または使用するには、デフォルトではサービスユーザー（TYPE=SERVICE）がネットワークポリシーの対象である必要がある。:</strong>
          <br />
          これは正しい説明です。ドキュメントの「Network policy requirements」セクションには「For service users (where TYPE=SERVICE for the user), you can only generate or use a token if the user is subject to a network policy.」と記載されています。
          この要件は認証ポリシーで変更可能です。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">誤っている選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-red-500">Programmatic Access Tokenの有効期限は、生成後に変更することができる。:</strong>
          <br />
          これは誤りです。ドキュメントの「Limitations」セクションに「You can only set the expiration time for a programmatic access token when you generate the token. After you generate the token, you cannot change the expiration time.」と明記されています。
          有効期限を変更したい場合は、既存のトークンを取り消し、新しい有効期限で新しいトークンを生成する必要があります。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        Programmatic Access Tokenは、パスワード認証の代替として、より安全で管理しやすい認証方法を提供します。
        特にAPI連携や自動化スクリプトでの利用に適しています。ただし、生成後の有効期限変更ができない点や、デフォルトでのネットワークポリシー要件など、いくつかの制約とベストプラクティスを理解しておくことが重要です。
      </p>
    </div>
  );
} 
