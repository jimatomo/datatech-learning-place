import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "CDK", "IaC", "Infrastructure"],
    created_at: new Date("2025-10-09"),
    updated_at: new Date("2025-10-09"),

    // ----- quiz -----
    title: "AWS CDKでCloudFormationパラメータを扱うときの注意点",
    question_jsx: <QuizQuestion />,
    options: {
      0: "CfnParameter を定義すると、生成される CloudFormation テンプレートには Parameters セクションが追加される。",
      1: "cdk deploy --parameters MyStack:MyParam=value のように指定すれば、デプロイ時にパラメータ値を上書きできる。",
      2: "parameter.valueAsString や valueAsNumber などのアクセサは、他のリソースのプロパティへトークンとして渡す用途で利用できる。",
      3: "CfnParameter の値は合成時に具体的な文字列へ評価されるため、if 文で分岐して生成するリソースを変えることができる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "パラメータと AWS CDK", url: "https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/parameters.html" },
      { title: "CloudFormation パラメータを使用して CloudFormation 値を取得する", url: "https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/get-cfn-param.html" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      AWS CDKで CloudFormation パラメータ (<code>CfnParameter</code>) を利用するときの説明として、<strong className="text-red-600">間違っているもの</strong>を1つ選択してください。パラメータは、スタックのデプロイ時に利用者が値を指定できるようにする仕組みです。
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        <code>CfnParameter</code> を使うと、CloudFormation テンプレートの <code>Parameters</code> セクションに同名のパラメータが生成され、デプロイ時に <code>cdk deploy --parameters</code> などで値を渡せます。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          <code>CfnParameter</code> を宣言するとテンプレートへパラメータが追加されます。これはドキュメントの手順通りで、アプリ側のコードを変更せずにデプロイ時の値を差し替えられます。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          デプロイ時に <code>--parameters Stack:Param=value</code> を指定することで、テンプレート内のパラメータに値を渡せます。スタック名を省略する場合は現在のスタックが対象になります。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          <code>valueAsString</code> や <code>valueAsNumber</code> は、他のリソースのプロパティへパラメータのトークンを渡す用途で使用できます。値は CloudFormation によってデプロイ時に解決されます。
        </li>
        <li>
          <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
          パラメータの値は合成時には確定しません。そのため <code>if (param.valueAsString === &quot;prod&quot;)</code> のように条件分岐へ直接使っても、実際にはトークンのままであり、意図した分岐にはなりません。デプロイ時に CloudFormation が実際の値を解決するため、合成時のロジック分岐にはコンテキスト値や環境変数など別の仕組みを使います。
        </li>
      </ul>
      <p>
        このように、パラメータはデプロイ時に値を注入する柔軟性を提供しますが、合成時に値が決まらない点を理解して使い分けることが重要です。
      </p>
    </div>
  );
}
