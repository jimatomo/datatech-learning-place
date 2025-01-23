import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "S3", "Event Notification"],
    created_at: new Date("2025-01-23"),
    updated_at: new Date("2025-01-23"),

    // ----- quiz -----
    title: "Amazon S3のイベント通知の設定",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Amazon SNSトピック",
      1: "Amazon SQSキュー",
      2: "AWS Lambda関数",
      3: "Amazon DynamoDBテーブル",
    },
    answers: [0, 1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Amazon S3 イベント通知のタイプおよび送信先", url: "https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html" },
      { title: "EventBridge の使用 - Amazon S3", url: "https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/EventBridge.html" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>Amazon S3のイベント通知を設定する際に、サポートされている送信先を選択してください：</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>Amazon S3のイベント通知は、Amazon SNSトピック、Amazon SQSキュー、AWS Lambda関数に送信できます。これらの送信先を使用することで、イベント駆動型のアーキテクチャを構築することが可能です。</p>
      <p>Amazon DynamoDBテーブルは、直接の送信先としてサポートされていません。</p>
      <p>S3にデータを送って連携をする仕組みは多く利用されています。イベントドリブンな実装ができるように選択可能な手順を調べておきましょう。</p>
      <p className="pt-2">
        さらに、Amazon S3はEventBridgeを使用してイベントを送信することもできます。
        EventBridgeの場合はフィルターの条件を設定することで柔軟に制御ができますが、
        間違えると意図しないトリガー条件にもなるのでイベントタイプ以外の条件の絞り込みにも注意しましょう。</p>
    </div>
  );
} 
