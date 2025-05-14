import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "CLI", "IAM", "Security", "Infrastructure"],
    created_at: new Date("2025-05-15"),
    updated_at: new Date("2025-05-15"),

    // ----- quiz -----
    title: "AWS CLIの認証とIAM Identity Centerのセッション管理",
    question_jsx: <QuizQuestion />,
    options: {
      0: "AWS CLIの認証には、IAMユーザーのアクセスキーとシークレットアクセスキーをハードコーディングすることが推奨される。",
      1: "AWS IAM Identity Center (旧 AWS SSO) を利用する場合、セッションの有効期限は最大12時間まで設定可能であり、セキュリティの観点から可能な限り短く設定することが推奨される。",
      2: "AWS CLIからIAM Identity Centerを利用して認証する場合、aws configure sso コマンド実行後に発行される短期認証情報は自動的に更新されないため、有効期限が切れるたびに手動で再取得する必要がある。",
      3: "IAM Identity Centerで管理されるセッションの持続時間は、ユーザーの利便性を考慮して、可能な限り長く設定することがベストプラクティスである。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "AWS CLI を使用した IAM アイデンティティセンター認証の設定", url: "https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-sso.html" },
      { title: "Set session duration for AWS accounts", url: "https://docs.aws.amazon.com/singlesignon/latest/userguide/howtosessionduration.html" },
      { title: "AWS IAM Identity Center concepts for the AWS CLI", url: "https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso-concepts.html" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-3">AWS Command Line Interface (CLI) の認証情報の取り扱いと、AWS IAM Identity Center (旧 AWS SSO) を利用した際のセッション管理に関する記述として、<strong className="text-emerald-500">最も適切なもの</strong>はどれでしょうか？</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm space-y-2">
      <p>
        各種選択肢に関して解説します。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-red-500">AWS CLIの認証には、IAMユーザーのアクセスキーとシークレットアクセスキーをハードコーディングすることが推奨される。</strong>：これは誤りです。
          アクセスキーのハードコーディングはセキュリティリスクを高めるため、IAMロールやIAM Identity Centerを利用した一時的な認証情報を利用することが推奨されます。
        </li>
        <li>
          <strong className="text-emerald-500">AWS IAM Identity Center (旧 AWS SSO) を利用する場合、セッションの有効期限は最大12時間まで設定可能であり、セキュリティの観点から可能な限り短く設定することが推奨される。</strong>：これは正しい記述です。
          IAM Identity Centerでは、ユーザーセッションの期間を設定でき、デフォルトは1時間、最大12時間まで延長可能です。
          セキュリティのベストプラクティスとして、必要最小限の期間に設定することが推奨されます。
        </li>
        <li>
          <strong className="text-red-500">AWS CLIからIAM Identity Centerを利用して認証する場合、aws configure sso コマンド実行後に発行される短期認証情報は自動的に更新されないため、有効期限が切れるたびに手動で再取得する必要がある。</strong>：これは誤りです。
          AWS CLIは、IAM Identity Centerで取得した短期認証情報の有効期限が近づくと、自動的に認証情報を更新しようと試みます。
        </li>
        <li>
          <strong className="text-red-500">IAM Identity Centerで管理されるセッションの持続時間は、ユーザーの利便性を考慮して、可能な限り長く設定することがベストプラクティスである。</strong>：これは誤りです。
          セッション持続時間は、利便性とセキュリティのバランスを考慮する必要がありますが、セキュリティの観点からは、不必要に長いセッションは避けるべきです。
        </li>
      </ul>
      <p>
        <strong>解説:</strong><br />
        AWS CLIを利用する際の認証方法として、静的なIAMユーザーのアクセスキーを直接設定するよりも、AWS IAM Identity Center (旧 AWS SSO) を利用して一時的な認証情報を取得する方法が推奨されています。
        これにより、認証情報のローテーションや管理の負担が軽減され、セキュリティが向上します。
      </p>
      <p>
        IAM Identity Centerでは、ユーザーがポータルにサインインしてからセッションが有効である期間（セッション持続時間）を設定できます。
        この期間は、アプリケーションやユースケースに応じて調整することが重要です。
        セキュリティを重視する場合、セッション持続時間は短く設定し、ユーザーに定期的な再認証を促すことが望ましいです。
        AWS CLIがセッションの有効期限を自動的に更新する機能も、このセキュリティモデルをサポートしています。
      </p>
    </div>
  );
} 
