import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Infrastructure as Code", "IaC", "AWS", "CloudFormation", "DevOps"],
    created_at: new Date("2025-07-10"),
    updated_at: new Date("2025-07-10"),

    // ----- quiz -----
    title: "Infrastructure as Code (IaC)の概念",
    question_jsx: <QuizQuestion />,
    options: {
      0: "宣言型IaCでは、インフラストラクチャの望ましい最終状態を定義し、ツールがその状態に到達する方法を決定する。",
      1: "命令型IaCでは、インフラストラクチャを構築するための具体的な手順を順序立てて記述する。",
      2: "AWS CloudFormationとAWS CDKは、どちらも宣言型IaCアプローチを採用している。",
      3: "命令型IaCは宣言型IaCよりも設定ドリフトの管理が容易で、インフラストラクチャの整合性を保つのに適している。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Infrastructure as Code (IaC) とは何ですか? - AWS",
        url: "https://aws.amazon.com/jp/what-is/iac/",
      },
      {
        title: "AWS CloudFormation とは?",
        url: "https://aws.amazon.com/jp/cloudformation/",
      },
      {
        title: "AWS CDK (Cloud Development Kit)",
        url: "https://aws.amazon.com/jp/cdk/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Infrastructure as Code (IaC)に関する記述として、
        <span className="text-red-500">間違っている</span>ものはどれですか？
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        選択肢の中で間違っているものは次のとおりです。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「命令型IaCは宣言型IaCよりも設定ドリフトの管理が容易で、インフラストラクチャの整合性を保つのに適している。」
          </strong>
          ：これは間違った記述です。実際は<strong className="text-red-500">宣言型IaCの方が設定ドリフトの管理が容易</strong>です。宣言型IaCでは望ましい状態を定義するため、ツールが現在の状態と比較して差分を自動的に検出・修正できます。命令型IaCでは、実行した手順の結果として現在の状態がどうなっているかを追跡するのが困難で、設定ドリフトが発生しやすくなります。
        </li>
      </ul>
      <p className="py-2">その他の選択肢は正しい記述です：</p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「宣言型IaCでは、インフラストラクチャの望ましい最終状態を定義し、ツールがその状態に到達する方法を決定する。」
          </strong>
          ：これは正しい記述です。宣言型IaCでは、「何を」達成したいかを定義し、「どのように」それを実現するかはツールに任せます。これにより、インフラストラクチャの管理が簡素化され、冪等性が保証されます。
        </li>
        <li className="pb-2">
          <strong>
            「命令型IaCでは、インフラストラクチャを構築するための具体的な手順を順序立てて記述する。」
          </strong>
          ：これは正しい記述です。命令型IaCでは、リソースを作成、変更、削除するための具体的なステップを順番に記述します。スクリプトやプログラムによる自動化がこれに該当します。
        </li>
        <li className="pb-2">
          <strong>
            「AWS CloudFormationとAWS CDKは、どちらも宣言型IaCアプローチを採用している。」
          </strong>
          ：これは正しい記述です。CloudFormationはJSONやYAMLテンプレートで望ましい状態を定義し、CDKはプログラミング言語で記述しますが最終的にCloudFormationテンプレートに変換されるため、どちらも宣言型のアプローチです。
        </li>
      </ul>
      <p className="py-2">
        <strong>宣言型 vs 命令型IaCの主な違い：</strong>
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-1">
          <strong>宣言型：</strong>「何を」達成したいかを定義（例：CloudFormation、Terraform）
        </li>
        <li className="pb-1">
          <strong>命令型：</strong>「どのように」達成するかの手順を定義（例：Ansible、Chef、Puppet）
        </li>
        <li className="pb-1">
          <strong>冪等性：</strong>宣言型は同じ操作を何度実行しても同じ結果になる
        </li>
        <li className="pb-1">
          <strong>状態管理：</strong>宣言型は現在の状態と期待する状態の差分を自動検出
        </li>
      </ul>
      <p className="pt-2">
        IaCを活用することで、インフラストラクチャの自動化、一貫性の確保、コストの削減、迅速なデプロイが可能になり、DevOpsプラクティスの重要な基盤となります。特に宣言型IaCは、複雑なクラウド環境における設定ドリフトの管理や、大規模なインフラストラクチャの運用において優れた効果を発揮します。
      </p>
    </div>
  );
}