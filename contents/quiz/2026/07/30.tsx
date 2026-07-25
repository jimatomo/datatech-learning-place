import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "S3", "DevOps", "Infrastructure"],
    created_at: new Date("2026-07-30"),
    updated_at: new Date("2026-07-30"),

    title: "Lambdaのself-managed code storage",
    question_jsx: <QuizQuestion />,
    options: {
      0: "S3ObjectStorageModeにREFERENCEを指定すると、Lambdaはデプロイパッケージをコピーせず、利用者自身のS3バケット上のオブジェクトを直接参照する。",
      1: "参照モードのコードはLambda管理ストレージのクォータを消費しない。あわせてLambda管理ストレージのデフォルト上限も75GBから300GBへ引き上げられた。",
      2: "利用するには、LambdaのサービスプリンシパルにバケットオブジェクトへのGetObjectとGetObjectVersionの許可を付与する必要がある。",
      3: "一度REFERENCEで関数を作成すれば、以後のコード更新時にS3ObjectStorageModeを省略しても参照モードが維持される。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "AWS Lambda Developer Guide - Self-managed S3 code storage",
        url: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-self-managed-storage.html",
      },
      {
        title: "AWS - Lambda announces self-managed code storage",
        url: "https://aws.amazon.com/about-aws/whats-new/2026/07/lambda-self-managed-code-storage/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        2026年7月に発表されたAWS Lambdaのself-managed code storage
        （自己管理S3バケットによるコード保存）について、
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
        従来のLambdaはデプロイパッケージを必ずLambda管理ストレージへコピーしており、
        大量の関数やレイヤーを持つアカウントではクォータ超過が問題になっていました。
        参照モードでは自分のバケットが唯一のコード置き場（single source of truth）になります。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          S3ObjectStorageModeはコード更新のたびに指定が必要です。
          update-function-codeで省略するとデフォルトのCOPYに戻り、
          Lambda管理ストレージへのコピーが復活します。CI/CDのデプロイスクリプトに
          明示的に組み込んでおかないと、意図せず参照モードが外れます。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>REFERENCEモードではコピーが作られず、コード保存クォータも消費しません。</li>
        <li>Lambda管理ストレージのデフォルト上限も75GBから300GBに拡大されました。</li>
        <li>Lambdaサービスプリンシパルへ読み取り許可（GetObject / GetObjectVersion）の付与が前提です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        参照モードではバケットの暗号化・アクセス制御・ライフサイクルの責任が利用者側に移ります。
        コード用オブジェクトを誤ってライフサイクルルールで消すと関数が壊れるため、
        デプロイアーティファクト専用バケットを分け、バージョニングを有効にして運用するのが安全です。
      </p>
    </div>
  );
}
