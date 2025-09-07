import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "AWS CDK", "IaC", "Infrastructure"],
    created_at: new Date("2025-09-11"),
    updated_at: new Date("2025-09-11"),

    // ----- quiz -----
    title: "AWS CDKのStageに関する記述",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Stageは、単一のAWSアカウントとリージョンにのみデプロイ可能で、複数の環境に展開することはできない。",
      1: "cdk deploy \"StageName/*\" のようにワイルドカードを使用することで、特定のStageに含まれるすべてのStackを一度にデプロイできる。",
      2: "Stage内で定義された複数のStackは、デプロイ時に単一のCloudFormationテンプレートに統合される。",
      3: "Stageをインスタンス化する際、Stackとは異なり、環境情報（アカウントやリージョン）を渡すことはできない。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "AWS CDK ステージの概要",
        url: "https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/stages.html",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        AWS CDKの <code>Stage</code> コンストラクトに関する記述のうち、
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
        AWS CDKの <code>Stage</code> は、複数のスタックをグループ化し、異なる環境（開発、本番など）へ一貫した単位でデプロイするための重要な構成要素です。
      </p>

      <div>
        <p className="font-semibold text-green-600">正しい記述:</p>
        <p>
          公式ドキュメントに示されているように、<code>cdk deploy &lt;&quot;Dev/*&quot;&gt;</code> のようなコマンドを実行することで、指定したStage（この場合は`Dev`）に含まれるすべてのStackをデプロイ対象とすることができます。これは、関連するリソース群をまとめて管理・デプロイする上で非常に便利な機能です。
        </p>
      </div>

      <div>
        <p className="font-semibold text-red-500">誤っている記述:</p>
        <ul className="list-disc pl-5 space-y-2 mt-1">
          <li>
            <strong>単一環境への制限:</strong> <code>Stage</code> の主な目的は、同じ構成のスタック群を「複数の環境」にデプロイすることです。例えば、開発用AWSアカウントと本番用AWSアカウントそれぞれに同じStageのインスタンスを作成できます。
          </li>
          <li>
            <strong>単一テンプレートへの統合:</strong> <code>Stage</code> はスタックを論理的にグループ化しますが、CloudFormationテンプレートは各Stackごとに個別に生成されます。<code>cdk list</code> を実行すると <code>Dev/AppStack</code> や <code>Prod/AppStack</code> のように、Stage名がプレフィックスとして付与された個別のスタックとして認識されていることがわかります。
          </li>
          <li>
            <strong>環境情報の受け渡し:</strong> <code>Stage</code> のインスタンスを作成する際に、<code>env</code> プロパティを通じてアカウントIDやリージョンといった環境固有の情報を渡すことが可能です。これにより、各環境（Dev, Prodなど）に応じた設定でデプロイできます。
          </li>
        </ul>
      </div>
    </div>
  );
}
