import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "S3", "Data Storage", "Datatech News"],
    created_at: new Date("2026-08-02"),
    updated_at: new Date("2026-08-02"),

    title: "S3 Standard-IA / One Zone-IAへの当日移行が可能に",
    question_jsx: <QuizQuestion />,
    options: {
      0: "従来はS3 Standardに30日置いてからでないとIA系ストレージクラスへライフサイクル移行できなかったが、オブジェクト作成当日から移行できるようになった。",
      1: "IA系はミリ秒アクセスを維持しながらS3 Standard比で最大40%程度低コストであり、数時間〜数日でコールド化するログやバックアップに向く。",
      2: "S3 One Zone-IAは単一のアベイラビリティゾーンに保存するためStandard-IAより安価だが、AZ喪失に対する耐性はない。",
      3: "当日移行の解禁にあわせて、IA系ストレージクラス側の最低30日分のストレージ課金や取り出し（retrieval）課金も廃止された。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "AWS News Blog - AWS Weekly Roundup (July 20, 2026)",
        url: "https://aws.amazon.com/blogs/aws/aws-weekly-roundup-one-click-lambda-setup-prompt-openai-gpt-5-6-models-on-bedrock-and-more-july-20-2026/",
      },
      {
        title: "Amazon S3 User Guide - Understanding and managing Amazon S3 storage classes",
        url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        2026年7月に発表された、S3 Standard-IA / S3 One Zone-IAへの
        当日移行（same-day transition）について、
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
        これまでIA系への移行には「S3 Standardで30日保持してから」という制約があり、
        すぐコールド化するデータでも最初の30日はStandard料金を払う必要がありました。
        今回の変更で、作成当日からIA系へライフサイクル移行できるようになりました。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          なくなったのは「移行前にStandardで30日保持する」という制約だけです。
          IA系ストレージクラス自体の課金特性は変わっておらず、30日未満で削除・上書き・
          再移行すると30日分が課金される最低ストレージ期間や、GBあたりの取り出し課金は残っています。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>作成当日からIA系へのライフサイクル移行が可能になりました。</li>
        <li>IA系はミリ秒アクセスを維持しつつStandardより大幅に安く、早期にコールド化するデータ向きです。</li>
        <li>One Zone-IAは単一AZ保存のためさらに安価ですが、AZ障害でデータを失うリスクがあります。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「書いたら数日でほぼ読まないが、30日以上は保持する」ログ・バックアップが最も恩恵を受けます。
        逆に、30日未満で消すデータや頻繁に読み直すデータをIAへ移すと、
        最低期間課金と取り出し課金で逆に高くつくため、削除までの保持期間とアクセス頻度を先に確認しましょう。
      </p>
    </div>
  );
}
