import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "AWS CDK", "IaC", "Infrastructure"],
    created_at: new Date("2025-08-21"),
    updated_at: new Date("2025-08-21"),

    // ----- quiz -----
    title: "AWS CDKにおけるアプリケーションの構成",
    question_jsx: <QuizQuestion />,
    options: {
      0: "AWS CDKアプリケーションは、1つ以上のCDKスタックのコレクションである。",
      1: "Appコンストラクトは、コンストラクトツリーのルートとして使用できる唯一のコンストラクトである。",
      2: "AWSリソースを表すすべてのコンストラクトは、Stackコンストラクトの範囲内で直接または間接的に定義する必要がある。",
      3: "コンストラクトをインスタンス化する際、スコープとして常にthis（Pythonではself）を渡す必要があり、それ以外のスコープを渡すことは技術的に不可能である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "AWS CDK アプリ - AWS クラウド開発キット (AWS CDK) v2",
        url: "https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/apps.html",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        AWS CDKアプリケーションの構成について説明している文章のうち、
        <strong className="text-red-500">誤っているもの</strong>はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">
        間違っている記述（正答）:
      </p>
      <p className="mt-2">
        コンストラクトをインスタンス化する際、スコープとして常にthis（Pythonではself）を渡す必要があり、それ以外のスコープを渡すことは技術的に不可能である、というのは誤りです。
      </p>
      <p className="mt-2">
        公式ドキュメントには「技術的には、コンストラクトをインスタンス化するときにthis以外のスコープを渡すことができます」と記載されています。ただし、ツリー内の任意の場所、または同じアプリ内の別のスタックにコンストラクトを追加できるため、コードの理解、維持、再利用が難しくなることから非推奨とされています。
      </p>
      <hr className="my-4" />
      <p className="font-semibold text-emerald-500">正しい記述:</p>
      <ul className="list-disc pl-4 py-2 space-y-2">
        <li>
          <b>AWS CDKアプリケーションは、1つ以上のCDKスタックのコレクションである:</b>
          これは正しい記載です。アプリケーションはスタックの集合体として定義されます。
        </li>
        <li>
          <b>
            Appコンストラクトは、コンストラクトツリーのルートとして使用できる唯一のコンストラクトである:
          </b>
          これも正しい記載です。すべてのコンストラクトは最終的に単一のAppインスタンスの下に階層化されます。
        </li>
        <li>
          <b>
            AWSリソースを表すすべてのコンストラクトは、Stackコンストラクトの範囲内で直接または間接的に定義する必要がある:
          </b>
          これも正しい記載です。リソースは必ずいずれかのスタックに所属する必要があります。
        </li>
      </ul>
    </div>
  );
}
