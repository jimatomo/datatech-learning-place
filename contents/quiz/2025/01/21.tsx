import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Advanced", "Security"],
    created_at: new Date("2025-01-21"),
    updated_at: new Date("2025-01-21"),

    // ----- quiz -----
    title: "Snowflakeの認証方式のベストプラクティス",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "パスワードより推測が困難なkey-pairの認証であれば、他の制限をつけなくても十分である", 
      1: "インタラクティブな認証が可能な人間のユーザに関してはSAMLの認証が推奨されている方式の一つである", 
      2: "パスワード認証をする場合は、MFAの設定を必須とするAuthentication Policyの適用が推奨されている", 
      3: "システムが利用するユーザはTYPE=SERVICEを設定することでインタラクティブな認証が制限された状態になるので、明示的に指定するべきである", 
      4: "MFAを設定しないパスワード認証は今後利用できなくなるので2025年の10月までに移行が必要である", 
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Best Practices to Mitigate the Risk of Credential Compromise", url: "https://www.snowflake.com/en/resources/white-paper/best-practices-to-mitigate-the-risk-of-credential-compromise/" },
      { title: "Snowflake Documentation - CREATE USER", url: "https://docs.snowflake.com/en/sql-reference/sql/create-user" },
      { title: "Snowflake Documentation - Authentication policies", url: "https://docs.snowflake.com/en/user-guide/authentication-policies" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>Snowflakeのクレデンシャル漏洩リスクを軽減するベスト・プラクティスに関して</span>
      <span className="text-red-500">間違っているもの</span>
      <span>を選択してください。</span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>Snowflakeのクレデンシャル漏洩リスクを軽減するベストプラクティスには、以下のものがあります（これ以外にもあるのでぜひ参考文献からホワイトペーパーを読んでみてください）：</p>
      <ul className="py-2 space-y-2">
        <li>・Key-pair認証は、パスワード認証と比較して推測が困難ですが、それだけでは十分ではありません。追加のセキュリティ対策としてネットワークポリシーを組み合わせることが推奨されています。もしくはショートタームなトークンを利用するOAuthを利用することも有効です。</li>
        <li>・人間のユーザーに対しては、SAMLやOAuth等のフェデレーション認証の利用が推奨されています。特にSAMLは組織の既存のIDプロバイダーと統合できる利点があります。</li>
        <li>・パスワード認証を使用する場合は、必ずMFAを有効にする認証ポリシーを適用することが推奨されています。新たに発行されるアカウントはデフォルトでAuthentication Policyが組み込まれた状態になります。</li>
        <li>・システムユーザー（サービスアカウント）には、TYPE=SERVICEを設定することで、インタラクティブなログインを制限し、OAuthかKey-pair認証のアクセスのみを許可することができます。</li>
        <li>・セキュリティ強化の一環として、MFAなしのパスワード認証は段階的に廃止され、2025年10月までに新しい認証方式への移行が必要となります。段階的に絞られていくので移行が間に合わない場合はTYPE=LEGACY_SERVICEを設定しておく必要があります。</li>
      </ul>
      <p>
        適切な認証方式の選択と実装は、Snowflakeプラットフォームのセキュリティを確保する上で重要な要素となります。
      </p>
    </div>
  );
}

