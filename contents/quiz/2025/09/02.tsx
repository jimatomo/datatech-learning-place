import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "Snowflake Advanced"],
    created_at: new Date("2025-09-02"),
    updated_at: new Date("2025-09-02"),

    // ----- quiz -----
    title: "SnowSQLにおけるMFA認証のパラメータ使用方法",
    question_jsx: <QuizQuestion />,
    options: {
      0: "snowsql -a account -u user -p mypassword --mfa-passcode 123456",
      1: "snowsql -a account -u user -p mypassword123456 --mfa-passcode-in-password",
      2: "snowsql -a account -u user -p mypassword -M",
      3: "上記すべてが正しい",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Connecting through SnowSQL | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/snowsql-start",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowSQLでMFA（多要素認証）を実行する際の設定方法として<strong className="text-green-600">正しいもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        SnowSQLでは、MFA（多要素認証）を実行するために複数の方法が提供されています。Snowflake 8.24以降では、管理者がすべての接続に対してMFAを必須にすることができます。
      </p>
      <br />
      <p className="font-semibold text-green-600">正解の選択肢（上記すべてが正しい）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong><code>--mfa-passcode</code> パラメータ</strong>: コマンドラインでMFAトークンを直接指定する方法です。例：<code>snowsql -a account -u user -p mypassword --mfa-passcode 123456</code>
        </li>
        <li>
          <strong><code>--mfa-passcode-in-password</code> パラメータ</strong>: パスワードの末尾にMFAパスコードを追加する方法です。このパラメータを使用すると、SnowSQLが自動的にMFAトークンをパスワードの末尾に追加します。
        </li>
        <li>
          <strong><code>-M, --mfa-prompt</code> パラメータ</strong>: 対話的にMFAトークンの入力を促す方法です。このオプションを使用すると、SnowSQLがMFAトークンの入力を求めます。
        </li>
      </ul>
      <p className="font-semibold text-green-600">各方法の詳細:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <code>--mfa-passcode</code>: トークンを直接指定するため、自動化スクリプトなどで使用しやすい方法です。
        </li>
        <li>
          <code>--mfa-passcode-in-password</code>: パスワードの末尾にMFAトークンを自動的に追加する機能で、特定の認証フローで使用されます。
        </li>
        <li>
          <code>-M, --mfa-prompt</code>: 対話的な入力が必要なため、手動での接続時に使用します。
        </li>
      </ul>
      <p>
        これらの方法はすべて公式ドキュメントでサポートされており、環境や用途に応じて適切な方法を選択できます。
      </p>
    </div>
  );
}