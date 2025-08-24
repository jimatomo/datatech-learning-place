import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "AWS CDK", "IaC", "Infrastructure"],
    created_at: new Date("2025-08-28"),
    updated_at: new Date("2025-08-28"),

    // ----- quiz -----
    title: "AWS CDKのスタックに関する記述",
    question_jsx: <QuizQuestion />,
    options: {
      0: "CDKスタックはデプロイの最小単位であり、スタック内のリソースは単一のCloudFormationスタックとしてデプロイされる。",
      1: "CloudFormationスタックの物理名は、stackNameプロパティを使用して明示的に指定しない限り、CDKによってコンストラクトパスに基づいて自動的に決定される。",
      2: "ネストされたスタックは、親スタック内で1つのリソースとしてカウントされ、CloudFormationのリソース上限（500個）を回避するのに役立つ。",
      3: "ネストされたスタックは独立したデプロイ成果物として扱われ、cdk deployコマンドで個別にデプロイできる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "AWS CDK スタックの概要 - AWS クラウド開発キット (AWS CDK) v2",
        url: "https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/stacks.html",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      AWS CDKのスタックに関する記述として
      <strong className="text-red-600">誤っているもの</strong>
      を一つ選択してください。
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        AWS CDKのネストされたスタックは親スタックにバインドされており、独立したデプロイはできません。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          CDKスタックはデプロイの最小単位であり、スタック内のリソースは単一のCloudFormationスタックとしてデプロイされる。これは正しい記述です。
          AWS CDKスタックは、AWSリソースのコレクションを表現し、デプロイの最小単位として機能します。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          CloudFormationスタックの物理名は、stackNameプロパティを使用して明示的に指定しない限り、CDKによってコンストラクトパスに基づいて自動的に決定される。これも正しい記述です。
          デフォルトの命名規則が存在しますが、stackNameプロパティで上書きすることが可能です。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          ネストされたスタックは、親スタック内で1つのリソースとしてカウントされ、CloudFormationのリソース上限（500個）を回避するのに役立つ。これも正しい記述です。
          ネストされたスタックはリソース集約のテクニックとして利用されます。
        </li>
        <li>
          <p className="font-semibold text-red-500">
            間違っている記述（正答）:
          </p>
          ネストされたスタックは独立したデプロイ成果物として扱われ、cdk deployコマンドで個別にデプロイできる。これは
          <strong className="text-red-600">誤った記述</strong>
          です。公式ドキュメントにある通り、ネストされたスタックは親スタックにバインドされており、cdk
          listやcdk deployで個別に操作することはできません。
        </li>
      </ul>
    </div>
  );
}
