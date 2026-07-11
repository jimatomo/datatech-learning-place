import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Codex",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "GitHub", "Security", "Infrastructure"],
    created_at: new Date("2026-07-16"),
    updated_at: new Date("2026-07-16"),

    title: "GitHub ActionsからAWSへOIDC認証する仕組み",
    question_jsx: <QuizQuestion />,
    options: {
      0: "GitHub ActionsはOIDCトークンを取得し、AWS STSを通じてIAMロールの一時的な認証情報と交換できる。",
      1: "ワークフローにはid-token: writeを設定する必要があるが、この設定自体がAWSリソースへの書き込み権限を与えるわけではない。",
      2: "IAMロールの信頼ポリシーではsubなどのクレームを条件にし、許可するリポジトリ、ブランチ、環境を限定する。",
      3: "OIDCを使う場合も、IAMユーザーの長期アクセスキーをGitHub Secretsへ保存し、そのキーでOIDCトークンへ署名する必要がある。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "GitHub Docs - Configuring OpenID Connect in Amazon Web Services",
        url: "https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws",
      },
      {
        title: "AWS IAM Documentation - OIDC federation",
        url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_oidc.html",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        GitHub ActionsからAWSへOpenID Connect（OIDC）で認証する構成について、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          OIDC連携の目的は、GitHub外部にAWSの長期認証情報を保存せず、実行時に短期認証情報を取得することです。
          IAMユーザーのアクセスキーはOIDCトークンの発行や署名に必要ありません。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li><code>id-token: write</code>はOIDCトークンの要求を許可する設定であり、AWS側の操作権限はIAMロールのポリシーで決まります。</li>
        <li>信頼ポリシーの<code>sub</code>条件を狭くし、意図しないリポジトリからのロール引き受けを防ぎます。</li>
      </ul>
    </div>
  );
}
