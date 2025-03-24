import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "SSO", "Snowflake Advanced"],
    created_at: new Date("2025-03-25"),
    updated_at: new Date("2025-03-25"),

    // ----- quiz -----
    title: "Snowflakeのフェデレーテッド認証とSSOについて",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Snowflakeは、OktaとAD FSのみをサポートしており、他のIdPは使用できない",
      1: "Snowflakeは、SAML 2.0に準拠した任意のIdPをサポートしており、OktaやAD FS以外のIdPも使用可能である",
      2: "SnowflakeのSSOは、パブリックアカウントURLでのみ動作し、プライベート接続では使用できない",
      3: "SnowflakeのSSOでは、IdPからのログアウト時に、すべてのアクティブなSnowflakeセッションが自動的に終了する",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Overview of federated authentication and SSO", url: "https://docs.snowflake.com/en/user-guide/admin-security-fed-auth-overview" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeでは、フェデレーテッド認証とSSO（シングルサインオン）をサポートしています。
        Snowflakeのフェデレーテッド認証とSSOに関する説明として、正しいものはどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのフェデレーテッド認証とSSOについて、以下の重要なポイントがあります：
      </p>

      <p className="py-2">
        1. サポートされているIdP：
      </p>
      <ul className="list-disc pl-6">
        <li>ネイティブサポート：Okta（ホスト型サービス）とMicrosoft AD FS（オンプレミス）</li>
        <li>SAML 2.0準拠の任意のIdP（Google G Suite、Microsoft Entra ID、OneLogin、Ping Identity PingOneなど）</li>
      </ul>

      <p className="py-2">
        2. SSOの動作：
      </p>
      <ul className="list-disc pl-6">
        <li>Snowflakeは、パブリックアカウントURLとプライベート接続の両方でSSOをサポート（どちらか一方のみ）</li>
        <li>プライベート接続を使用する場合は、SSOの設定<span className="text-red-500">前</span>にプライベート接続の設定が必要</li>
        <li>IdPからのログアウト時は、標準ログアウトとグローバルログアウトの2つのオプションがある</li>
        <li>グローバルログアウトのサポートはIdPによって異なる（AD FSは両方サポート、Oktaは標準ログアウトのみ）</li>
      </ul>

      <p className="py-2">
        Snowflakeのログイン画面からSAML認証のオプションが表示される状態でもパスワードの認証（Snowflakeネイティブ）は可能です。
        Snowflakeネイティブなログインを無効にするにはユーザのパスワードをnullに設定する必要があります。
      </p>
      <p className="py-2">
        パスワードの認証を利用する場合はMFAの設定は必須（時限措置はある）ですが、SAMLの場合はIdP側でMFAが設定されている前提でMFAは任意です。
        ただし、ACCOUNTADMINなどの強力なロールを利用できるユーザはSAMLにセットでMFAを設定することも可能なので、何段階にもきっちり制御するといいでしょう。
      </p>
    </div>
  );
} 
