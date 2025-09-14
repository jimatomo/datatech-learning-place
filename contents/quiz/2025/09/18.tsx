import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS CDK", "IaC", "CloudFormation", "Infrastructure"],
    created_at: new Date("2025-09-18"),
    updated_at: new Date("2025-09-18"),

    // ----- quiz -----
    title: "AWS CDK コンストラクトのレベル",
    question_jsx: <QuizQuestion />,
    options: {
      0: "レベル1 (L1) コンストラクト",
      1: "レベル2 (L2) コンストラクト",
      2: "レベル3 (L3) コンストラクト",
      3: "レベル4 (L4) コンストラクト",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "AWS CDK コンストラクト - AWS クラウド開発キット (AWS CDK) v2",
        url: "https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/constructs.html",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        AWS CDKのコンストラクトには3つのレベルがあります。最も抽象度が高く、特定のユースケースのためのAWSアーキテクチャ全体を作成するために使用されるコンストラクトレベルとして
        <strong className="text-green-600">正しいもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm space-y-3">
      <p>
        AWS CDKでは、抽象度の異なる3つのレベルのコンストラクトが提供されており、それぞれ異なる目的で使用されます。
      </p>

      <div>
        <p className="font-semibold text-green-600">正解の選択肢:</p>
        <p>
          <strong>レベル3 (L3) コンストラクト</strong>は「パターン」とも呼ばれ、最も高いレベルの抽象化を提供します。複数のAWSリソースを組み合わせて特定のタスクやアプリケーションのユースケース（例: Application Load Balancerを持つFargateサービス）を実現するためのアーキテクチャ全体を定義します。これにより、最小限のコードで複雑な構成を迅速に構築できます。
        </p>
      </div>

      <div>
        <p className="font-semibold text-red-500">誤っている選択肢:</p>
        <ul className="list-disc pl-5 space-y-2 mt-1">
          <li>
            <strong>レベル1 (L1) コンストラクト:</strong> 「CFNリソース」とも呼ばれ、AWS CloudFormationリソースと1対1で対応する最も低いレベルのコンストラクトです。抽象化は行われず、CloudFormationのプロパティを直接定義します。
          </li>
          <li>
            <strong>レベル2 (L2) コンストラクト:</strong> 「キュレーションされた」コンストラクトとも呼ばれ、L1よりも高い抽象化を提供します。便利なデフォルト値、ベストプラクティスに基づいたセキュリティポリシー、定型的なコードを削減するためのヘルパーメソッドなどが含まれており、CDKで最も一般的に使用されるコンストラクトです。
          </li>
          <li>
            <strong>レベル4 (L4) コンストラクト:</strong> このレベルのコンストラクトはAWS CDKには存在しません。
          </li>
        </ul>
      </div>
    </div>
  );
}
