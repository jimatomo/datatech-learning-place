import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "Data Integration", "DevOps", "Infrastructure"],
    created_at: new Date("2026-08-20"),
    updated_at: new Date("2026-08-20"),

    title: "Amazon EventBridgeの位置づけ",
    question_jsx: <QuizQuestion />,
    options: {
      0: "イベントバスは、複数ソースから受けたイベントをルールで評価し、一致したものをゼロ個以上のターゲットへ届けるルーターである。",
      1: "デフォルトのイベントバスは、EC2の状態変更などAWSサービスが発行するイベントを自動的に受け取る。",
      2: "EventBridge Pipesは1つのソースから1つのターゲットへ送るポイントツーポイント連携向けで、変換やエンリッチメントも持てる。",
      3: "EventBridgeはStep Functionsの代替であり、分岐・待機・リトライを含む状態付きワークフローをイベントバス上で定義するオーケストレーションサービスである。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "AWS Documentation - What is Amazon EventBridge?",
        url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html",
      },
      {
        title: "AWS Documentation - Event buses in Amazon EventBridge",
        url: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-event-bus.html",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Amazon EventBridgeについて、
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
        EventBridgeの本体は「イベントを拾って、条件に合う行き先へ届ける」ことです。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          状態を持つ複数ステップのオーケストレーションはStep Functionsの領域です。
          EventBridgeはルーティング（とスケジュール）であり、ワークフローエンジンではありません。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>イベントバスは多対多のルーターで、ルールごとに最大5ターゲットまで並列配送できます。</li>
        <li>AWSサービスのイベントは、特別なバスを自作しなくてもデフォルトバスへ入ります。</li>
        <li>1対1で流しつつ変換したいときはPipesが向きます。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「誰が発火したら誰を呼ぶか」はEventBridge、「その後の手順と補償」はStep Functions、と切る。
        S3へ届けるだけならFirehose、イベントでLambdaやワークフローを起動するならEventBridgeです。
      </p>
    </div>
  );
}
