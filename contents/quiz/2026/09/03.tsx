import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "Data Integration", "DevOps", "Infrastructure"],
    created_at: new Date("2026-09-03"),
    updated_at: new Date("2026-09-03"),

    title: "Amazon SNSの位置づけ",
    question_jsx: <QuizQuestion />,
    options: {
      0: "トピックへ公開したメッセージを、複数のサブスクライバへファンアウトするpub/subサービスである。",
      1: "サブスクライバにはSQS、Lambda、HTTP(S)、メール、モバイルプッシュ、SMS、Firehoseなどを指定できる。",
      2: "SQSをサブスクライブさせると、購読側が落ちてもキューがバッファになり、後から処理を再開できる。",
      3: "購読者がいないトピックでも、SQSと同様に最大14日間メッセージを保持し、後からサブスクライブすれば受け取れる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "AWS Documentation - What is Amazon SNS?",
        url: "https://docs.aws.amazon.com/sns/latest/dg/welcome.html",
      },
      {
        title: "AWS Documentation - Differences between Amazon SQS, Amazon MQ, and Amazon SNS",
        url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Amazon SNSについて、
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
        SNSは「今いる購読者へ同時に配る」プッシュ型です。キューのようにメッセージを保管して待つサービスではありません。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          購読者がいなければメッセージは破棄されます。14日保持はSQSの話です。
          止められない配信が要るなら、SNSの先にSQSを挟みます。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>1公開で複数エンドポイントへ複製するのがファンアウトです。</li>
        <li>アプリ間（A2A）だけでなく、メールやSMSなどの人向け（A2P）も担えます。</li>
        <li>topic-queue-chaining（SNS→SQS）で、処理側の障害をキューが吸収します。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「同じ出来事を今すぐ複数システムへ」はSNS、「1件を確実に1労働者が消化」はSQS。
        両方要るならSNSで配ってSQSで受ける。EventBridgeはイベントバスのルール向きです。
      </p>
    </div>
  );
}
