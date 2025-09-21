import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "CDK", "CloudFormation", "Infrastructure"],
    created_at: new Date("2025-09-25"),
    updated_at: new Date("2025-09-25"),

    // ----- quiz -----
    title: "AWS CDKにおけるコンストラクトIDのスコープ",
    question_jsx: <QuizQuestion />,
    options: {
      0: "idは、作成されるスコープ内で一意である必要がある。",
      1: "idは、AWS CDKアプリケーション全体でグローバルに一意である必要がある。",
      2: "異なるスコープであれば、同じidを持つコンストラクトを定義できる。",
      3: "スタックのidは、AWS CDK CLIでスタックを参照するために使用される。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "識別子と AWS CDK - AWS クラウド開発キット (AWS CDK) v2", url: "https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/identifiers.html" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      AWS CDKにおいて、コンストラクトをインスタンス化する際に2番目の引数として渡される<code>id</code>識別子に関する説明として、<strong className="text-red-600">誤っているもの</strong>はどれですか？
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        AWS CDKにおける<code>id</code>識別子は、それが定義されるコンストラクトのスコープ内でのみ一意である必要があります。AWS CDKアプリケーション全体でグローバルに一意である必要はありません。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          「idは、作成されるスコープ内で一意である必要がある。」は正しい記載です。コンストラクトIDは、それが属するスコープ内でユニークであれば問題ありません。
        </li>
        <li>
          <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
          「idは、AWS CDKアプリケーション全体でグローバルに一意である必要がある。」は誤った記述です。<code>id</code>はグローバルに一意である必要はありません。例えば、異なる2つのスタック内で、それぞれ同じ<code>id</code>（例: &apos;MyBucket&apos;）を持つS3バケットコンストラクトを定義することが可能です。これは、それぞれのコンストラクトのスコープが異なるためです。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          「異なるスコープであれば、同じidを持つコンストラクトを定義できる。」は正しい記載です。CDKはコンストラクトツリーのパスでリソースを一意に識別するため、スコープが異なれば同じIDを使用できます。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          「スタックのidは、AWS CDK CLIでスタックを参照するために使用される。」は正しい記載です。スタックレベルで定義された<code>id</code>は、<code>cdk deploy</code>などのAWS CDK CLIコマンドで特定のスタックを対象とする際に使用されます。
        </li>
      </ul>
      <p>
        このスコープの概念により、再利用可能なコンストラクトを異なるスタックやアプリケーションで容易に利用することができます。
      </p>
    </div>
  );
}
