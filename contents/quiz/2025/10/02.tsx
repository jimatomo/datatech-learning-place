import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "CDK", "IaC", "Infrastructure"],
    created_at: new Date("2025-10-02"),
    updated_at: new Date("2025-10-02"),

    // ----- quiz -----
    title: "AWS CDKにおけるトークン(Token)の役割",
    question_jsx: <QuizQuestion />,
    options: {
      0: "トークンは、S3バケット名やVPCのIDなど、デプロイ時に初めて確定する値を扱うために使用される。",
      1: "cdk synth を実行すると、トークンは ${Token[TOKEN.<1234>]} のような形式で表現され、実際の値はデプロイ時に解決される。",
      2: "トークンは文字列や数値だけでなく、リスト形式の値も表現することができる。",
      3: "Lazy.string() や Lazy.number() を使うことで、合成時（synth-time）の遅延値を表現できるが、これはトークンとは異なる仕組みである。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "トークンと AWS CDK - AWS クラウド開発キット (AWS CDK) v2", url: "https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/tokens.html" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      AWS CDKにおけるトークン (Token) に関する説明として、<strong className="text-red-600">間違っているもの</strong>を1つ選択してください。トークンはCDKアプリケーションにおいて、合成時（<code>cdk synth</code>時）に値が確定しない値を表現するためのプレースホルダーです。
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        AWS CDKにおけるトークンは、デプロイ時まで値が確定しない動的な値を扱うための重要な概念です。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          「トークンは、S3バケット名やVPCのIDなど...」は正しいです。例えば、S3バケットを作成する際、実際のバケット名はデプロイ時にAWS CloudFormationによって一意な名前が生成されます。CDKコード内ではこの値をトークンとして扱い、他のリソースから参照できます。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          「cdk synth を実行すると...」は正しいです。合成段階では実際の値が不明なため、CDKはトークンというプレースホルダーをCloudFormationテンプレートに出力します。このトークンは、デプロイ時にAWS CloudFormationによって実際の値に置き換えられます。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          「トークンは文字列や数値だけでなく...」は正しいです。例えば、セキュリティグループのIDリストなど、文字列の配列をトークンとして扱うことができます。
        </li>
        <li>
          <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
          「Lazy.string() や Lazy.number() を使うことで...」は誤った記述です。<code>Lazy</code>クラスの静的メソッドは、合成時の遅延値を表現するためのトークンを生成するために使用されます。値が決定されるタイミングが他のリソースに依存する場合など、合成処理の後半で値が確定するケースで役立ちます。これはトークンの一機能であり、「異なる仕組み」ではありません。
        </li>
      </ul>
      <p>
        このように、トークンはCDKの強力な機能の1つであり、インフラストラクチャの定義に柔軟性をもたらします。
      </p>
    </div>
  );
}
