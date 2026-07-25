import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "DevOps", "Snowflake Advanced"],
    created_at: new Date("2026-07-28"),
    updated_at: new Date("2026-07-28"),

    title: "Workload Identity Federationによるシークレットレス認証",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ワークロードは、クラウドの識別プロバイダーが発行するattestation（多くはJWT）をSnowflakeドライバー経由で提示し、事前に紐づけたユーザーとして認証される。",
      1: "識別プロバイダーとしてAWS IAMのほか、EKS / AKS / GKEなどのOIDC issuer、SPIFFE/SPIRE、カスタムOIDCプロバイダーを利用できる。",
      2: "GitHub ActionsやGitLabから使う場合は、OIDCトークンのsubクレームをカスタマイズして環境間で同一のsubjectに揃える構成ができる。",
      3: "Workload Identity Federationを使う場合でも、Snowflake側にワークロード用の長期パスワードを保存しておき、attestationと合わせて提示する必要がある。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Documentation - Workload identity federation",
        url: "https://docs.snowflake.com/en/user-guide/workload-identity-federation",
      },
      {
        title: "Snowflake Documentation - User management (Types of users)",
        url: "https://docs.snowflake.com/en/user-guide/admin-user-management",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowflakeのWorkload Identity Federation（WIF）について、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        WIFは、クラウド上で動くワークロードが「自分の実行環境の身元証明（attestation）」を
        そのままSnowflakeへの認証に使う仕組みです。パスワードやキーペア、
        プログラムアクセストークンの発行・ローテーション・保管が不要になります。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          長期シークレットを排除することがWIFの目的そのものです。Snowflake側のサービスユーザーには
          「どの識別プロバイダーの、どの識別子を信頼するか」を設定するだけで、
          パスワード等のクレデンシャルは保存しません。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>ドライバーが実行環境からattestationを取得してSnowflakeへ送り、検証されて接続が確立します。</li>
        <li>AWS IAM・各マネージドKubernetesのOIDC issuer・SPIFFE/SPIRE・カスタムOIDCに対応します。</li>
        <li>
          GitHub / GitLabのOIDCトークンはデフォルトではsubが環境ごとに変わるため、
          subクレームのカスタマイズで固定するのが定石です。
        </li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「ワークロードがクラウドIdPを持つならWIF、持たない環境（オンプレ等）ならキーペア認証」
        が使い分けの出発点です。CI/CDのシークレット漏えい対策として、まずSnowflake接続の
        パスワードをリポジトリのシークレットから消せないか検討する価値があります。
      </p>
    </div>
  );
}
