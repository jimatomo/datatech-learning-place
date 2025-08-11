import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Management", "Security"],
    created_at: new Date("2025-04-26"),
    updated_at: new Date("2025-04-26"),

    // ----- quiz -----
    title: "データセキュリティの4つのAとEntitlement",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Access（アクセス）は、権限を持つ個人がタイムリーにシステムにアクセスできるようにする概念であり、情報システムへの接続やデータの操作（動詞）、およびデータに対する有効な権限（名詞）という二つの意味を持つ。",
      1: "Audit（監査）は、システムへのアクセスや操作の記録を保持し、セキュリティインシデントの検出やコンプライアンス要件の遵守を支援する。",
      2: "Entitlementは、ユーザーがアクセスできるデータエレメントの集合を定義し、一度のアクセス権限付与で複数のデータ要素へのアクセスを管理できる。",
      3: "Authentication（認証）とAuthorization（認可）は同じ概念で、ユーザーの身元確認とアクセス権限の付与を同時に行うプロセスを指す。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        データセキュリティの4つのA（Access、Audit、Authentication、Authorization）とEntitlementに関する記述として、<span className="text-red-500">間違っている</span>選択肢を選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        <strong>「Authentication（認証）とAuthorization（認可）は同じ概念で、ユーザーの身元確認とアクセス権限の付与を同時に行うプロセスを指す。」</strong>という記述は間違っています。
        AuthenticationとAuthorizationは異なる概念です。Authenticationはユーザーの身元を確認するプロセス（例：パスワード認証、多要素認証）であり、Authorizationは認証されたユーザーに対して適切なアクセス権限を付与するプロセスです。
      </p>
      <p className="py-2">
        その他の選択肢は正しい記述です：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>Access（アクセス）:</strong> 権限を持つ個人がタイムリーにシステムにアクセスできるようにします。情報システムに積極的に接続し、動詞としてのデータを操作すること、および名詞としてその人物がデータに対する有効な権限を持っていることの二つの意味合いがあります。
        </li>
        <li className="pb-2">
          <strong>Audit（監査）:</strong> システムへのアクセスや操作の記録を保持し、セキュリティインシデントの検出やコンプライアンス要件の遵守を支援します。これにより、セキュリティポリシーの遵守状況を確認できます。
        </li>
        <li className="pb-2">
          <strong>Entitlement:</strong> 一度のアクセス権限付与によって、一人のユーザーに公開されるデータエレメントの集合を定義します。これにより、効率的なアクセス権限管理が可能になります。
        </li>
      </ul>
      <p className="pt-2">
        データセキュリティを実現するためには、4つのAとEntitlementの概念を適切に理解し、それぞれの要素を効果的に組み合わせて実装することが重要です。また、これらの要素をサポートするための情報分類、アクセス権、ロールグループ、ユーザー管理、パスワードポリシーなどの手段も適切に設計・運用する必要があります。
      </p>
    </div>
  );
} 
