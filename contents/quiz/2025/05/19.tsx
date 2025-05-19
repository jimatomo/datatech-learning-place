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
    tags: ["Snowflake", "REST API", "Authentication", "Snowflake Basic"],
    created_at: new Date("2025-05-19"),
    updated_at: new Date("2025-05-19"),

    // ----- quiz -----
    title: "Snowflake REST APIの認証方式",
    question_jsx: <QuizQuestion />,
    options: {
      0: "キーペア認証を使用する場合、JWTトークンのペイロードにはiss、sub、iat、expの4つのフィールドが必須である。",
      1: "OAuth認証を使用する場合、Authorizationヘッダーには「Bearer」プレフィックスを付けてトークンを指定する必要がある。",
      2: "プログラムアクセストークン（PAT）を使用する場合、X-Snowflake-Authorization-Token-Typeヘッダーは必須である。",
      3: "キーペア認証のJWTトークンは、発行後最大24時間有効である。",
      4: "OAuth認証を使用する場合、SnowSQLでの接続テストはWindowsシステムとLinux/MacOSシステムで異なるコマンド形式を使用する必要がある。",
    },
    answers: [0, 1, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Authenticating Snowflake REST APIs with Snowflake - Snowflake Documentation",
        url: "https://docs.snowflake.com/en/developer-guide/snowflake-rest-api/authentication"
      }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflake REST APIの認証方式に関する記述のうち、正しいものを全て選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        各選択肢の解説は以下の通りです。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-emerald-500">キーペア認証を使用する場合、JWTトークンのペイロードにはiss、sub、iat、expの4つのフィールドが必須である。</strong>：これは正しい記載です。
          JWTトークンのペイロードには、発行者（iss）、主体（sub）、発行時刻（iat）、有効期限（exp）の4つのフィールドが必須です。これらのフィールドは、トークンの認証と有効性の検証に使用されます。
        </li>
        <li>
          <strong className="text-emerald-500">OAuth認証を使用する場合、Authorizationヘッダーには「Bearer」プレフィックスを付けてトークンを指定する必要がある。</strong>：これは正しい記載です。
          OAuthトークンを使用する場合、Authorizationヘッダーは「Bearer」プレフィックスを付けて「Authorization: Bearer &lt;oauth_token&gt;」の形式で指定する必要があります。
        </li>
        <li>
          <strong className="text-red-500">プログラムアクセストークン（PAT）を使用する場合、X-Snowflake-Authorization-Token-Typeヘッダーは必須である。</strong>：これは誤った記載です。
          X-Snowflake-Authorization-Token-Typeヘッダーは任意であり、省略可能です。Snowflakeはトークンを検査して自動的にトークンタイプを判断します。
        </li>
        <li>
          <strong className="text-red-500">キーペア認証のJWTトークンは、発行後最大24時間有効である。</strong>：これは誤った記載です。
          JWTトークンは発行後最大1時間のみ有効です。たとえexpフィールドでより長い有効期限を指定した場合でも、1時間を超えることはできません。
        </li>
        <li>
          <strong className="text-emerald-500">OAuth認証を使用する場合、SnowSQLでの接続テストはWindowsシステムとLinux/MacOSシステムで異なるコマンド形式を使用する必要がある。</strong>：これは正しい記載です。
          Windowsシステムではトークンをダブルクォートで囲む必要がありますが、Linux/MacOSシステムではその必要はありません。これはシェルの違いによるものです。
        </li>
      </ul>
    </div>
  );
} 
