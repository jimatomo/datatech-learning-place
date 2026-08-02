import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "DevOps", "Data Integration", "Infrastructure"],
    created_at: new Date("2026-08-06"),
    updated_at: new Date("2026-08-06"),

    title: "AWS Step Functionsによるデータパイプライン連携",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Step Functionsはステートマシン（ワークフロー）として、イベント駆動の一連のステップを定義・実行するオーケストレーションサービスである。",
      1: "GlueやLambda、EMRなど複数のAWSサービスを組み合わせたETL/データ処理の流れを、可視化・エラーハンドリング付きで調整できる。",
      2: "各ステップの状態を追跡し、失敗時のリトライや診断に使えるため、長めの分散処理パイプラインに向いている。",
      3: "Step Functionsはデータ変換そのものを行うコンピュートエンジンであり、SQLエンジンや分散処理クラスタの代わりに大規模集計を直接実行するのが主用途である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "AWS - What is Step Functions?",
        url: "https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html",
      },
      {
        title: "AWS - Run an ETL/ELT workflow using Step Functions and the Amazon Redshift API",
        url: "https://docs.aws.amazon.com/step-functions/latest/dg/sample-etl-orchestration.html",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        データパイプラインにおけるAWS Step Functionsの位置づけについて、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Step Functionsは「何をどの順で、失敗したらどうするか」を担うオーケストレーターです。
        重い変換・集計自体はGlueやEMR、Redshift、Lambdaなどの実行系に委譲します。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          Step Functionsはコンピュートエンジンではなく、ステートマシンによる調整役です。
          大規模集計の実行主体として使うのではなく、それらのジョブを順序付け・並列化・監視するのが主用途です。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>ワークフローはステートの連続として定義され、実行インスタンスはexecutionと呼ばれます。</li>
        <li>GlueやLambdaなどとの連携により、ETLパイプラインを組み立てられます。</li>
        <li>状態追跡とリトライにより、分散処理の運用性を高められます。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「変換ロジックをどこに書くか」と「ジョブの順序・分岐・失敗処理をどこで持つか」を分けて考えると設計がクリアになります。
        後者をStep Functionsに寄せ、前者は用途に合う専用サービスへ置くのが定石です。
      </p>
    </div>
  );
}
