import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "Datatech News"],
    created_at: new Date("2025-08-17"),
    updated_at: new Date("2025-08-17"),

    // ----- quiz -----
    title: "SnowflakeのWorkload Identity Federationの主な利点",
    question_jsx: <QuizQuestion />,
    options: {
      0: "パスワードやAPIキーのような長期的な認証情報を管理・保存する必要がなくなる。",
      1: "クエリの実行パフォーマンスが大幅に向上する。",
      2: "データストレージのコストを自動的に最適化し、削減する。",
      3: "すべてのSnowflakeドライバで、バージョンに関わらず追加設定なしで利用できる。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Workload identity federation",
        url: "https://docs.snowflake.com/en/user-guide/workload-identity-federation",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>SnowflakeのWorkload Identity Federationが提供する<strong className="text-green-600">主な利点</strong>として、最も適切なものを1つ選択してください。</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Workload Identity Federationは、アプリケーションやサービスなどのワークロードが、クラウドプロバイダーのネイティブなIDシステム（例: AWS IAMロール）を使用してSnowflakeに認証できるようにするサービス間認証方法です。
      </p>
      <p className="font-semibold text-green-600 mt-2">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          この方法の最大の利点は、パスワード、APIキー、キーペアなどの長期的な認証情報をコードや設定ファイルに保存・管理する必要がなくなることです。代わりに、各プラットフォームのネイティブなメカニズムを通じて、プラットフォームのIDプロバイダーから短期的な認証情報が自動的に取得されます。これにより、セキュリティが向上し、認証情報ローテーションの複雑さが軽減されます。
        </li>
      </ul>
      <p className="font-semibold text-red-500 mt-2">間違っている記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          パフォーマンス向上やストレージコスト削減は、Workload Identity Federationの直接的な機能や目的ではありません。
        </li>
        <li>
          この機能を利用するには、対応する最低バージョン以上のSnowflakeドライバ（例: Go v1.16.0, JDBC v3.26.0など）が必要です。すべてのバージョンで利用できるわけではありません。
        </li>
      </ul>
    </div>
  );
}


