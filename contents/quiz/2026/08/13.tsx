import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "Data Integration", "S3", "Infrastructure"],
    created_at: new Date("2026-08-13"),
    updated_at: new Date("2026-08-13"),

    title: "Amazon Data Firehoseの位置づけ",
    question_jsx: <QuizQuestion />,
    options: {
      0: "リアルタイムのストリーミングデータを、S3やRedshift、OpenSearch、Splunk、HTTPエンドポイントなどへ配信するフルマネージドサービスである。",
      1: "プロデューサーがFirehoseストリームへレコードを送ると、指定した宛先へ自動配信される。配信前の変換も設定できる。",
      2: "バッファサイズ（MB）とバッファ間隔（秒）に達するまで受信データをまとめ、まとめて宛先へ届ける。",
      3: "Firehoseはストリーム処理の状態管理やカスタムウィンドウ集計をアプリケーション側で書くためのサービスであり、宛先への自動ロード機能は持たない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "AWS Documentation - What is Amazon Data Firehose?",
        url: "https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html",
      },
      {
        title: "AWS - Amazon Data Firehose FAQs",
        url: "https://aws.amazon.com/firehose/faqs/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Amazon Data Firehose（旧称 Amazon Kinesis Data Firehose）について、
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
        Firehoseは「受け取ったストリームを宛先へ届ける」配送サービスです。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          状態を持つ複雑なストリーム処理を自分で書く場ではありません。
          設定した宛先への自動配信（必要なら変換付き）が本体です。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>S3 / Redshift / OpenSearch / Splunk / HTTP などへ配信できます。</li>
        <li>アプリやサーバ管理を減らし、送信先設定中心で使います。</li>
        <li>バッファ条件でまとめて届ける挙動が基本です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「届ける」ならFirehose、「自分で処理ロジックを持つ」ならKinesis Data StreamsやFlink等を選ぶ。
        まず目的が配送か加工かを切り分けます。
      </p>
    </div>
  );
}
