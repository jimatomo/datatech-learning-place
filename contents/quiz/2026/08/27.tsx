import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "Data Integration", "DevOps", "Infrastructure"],
    created_at: new Date("2026-08-27"),
    updated_at: new Date("2026-08-27"),

    title: "Amazon SQSの位置づけ",
    question_jsx: <QuizQuestion />,
    options: {
      0: "分散コンポーネントをキューで疎結合にするサービスである。標準キューはほぼ無制限のスループットで、少なくとも1回配信する。",
      1: "FIFOキューは順序と重複排除を保証する。スループットは標準より低く、順序が要らない処理では標準を選ぶ。",
      2: "受信後もメッセージはキューに残り、可視性タイムアウトの間だけ他の消費者から隠れる。処理後に明示削除する。",
      3: "受信した時点でメッセージはキューから消え、処理に失敗しても再配信されない。保持期間の設定もできない。",
      4: "デフォルトの保持期間は4日、設定可能な範囲は60秒から14日である。可視性タイムアウトの既定は30秒である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "AWS Documentation - What is Amazon Simple Queue Service?",
        url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
      },
      {
        title: "AWS Documentation - Amazon SQS visibility timeout",
        url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Amazon SQSについて、
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
        SQSは「1件を1消費者が処理するまでキューに置いておく」サービスです。配信そのものはプッシュ型のSNSではありません。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          受信してもメッセージは消えません。タイムアウト内にDeleteしないと再可視になり、再処理されます。
          保持期間も60秒〜14日で設定できます。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>標準は高スループット・少なくとも1回・順序はベストエフォートです。</li>
        <li>順序と重複禁止が要るときだけFIFOにします。</li>
        <li>可視性タイムアウト（既定30秒）で処理中の二重取りを防ぎ、終わったらDeleteします。</li>
        <li>放置メッセージは保持期間後に自動削除されます。既定は4日です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        処理時間に対して可視性タイムアウトが短いと重複処理、長いと失敗時の再試行が遅れます。
        まず処理時間の上限に合わせ、失敗が残るメッセージはデッドレターキューへ回します。
      </p>
    </div>
  );
}
