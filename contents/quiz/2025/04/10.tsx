import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "Infrastructure", "RDS"],
    created_at: new Date("2025-04-10"),
    updated_at: new Date("2025-04-10"),

    // ----- quiz -----
    title: "Amazon RDSのマルチAZ配置について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "マルチAZ配置では、プライマリインスタンスとスタンバイインスタンスは異なるリージョンに配置される",
      1: "マルチAZ配置では、スタンバイインスタンスは読み取り専用として設定することができる",
      2: "マルチAZ配置では、バックアップはスタンバイインスタンスから取得されるため、プライマリインスタンスのパフォーマンスに影響を与えない",
      3: "マルチAZ配置では、フェイルオーバー時に最大60秒のダウンタイムが発生する可能性がある",
    },
    answers: [0, 1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Amazon RDS マルチ AZ", url: "https://aws.amazon.com/jp/rds/features/multi-az/" },
      { title: "Amazon RDS の高可用性", url: "https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Amazon RDSのマルチAZ配置（一つのスタンバイを備えたパターン）に関する説明として、<span className="text-red-500">間違っているもの</span>を全て選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Amazon RDSのマルチAZ配置は、データベースの高可用性と耐久性を実現する重要な機能です。
        各選択肢について解説します。
      </p>

      <p className="py-2 font-semibold text-red-500">間違っている選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>マルチAZ配置では、プライマリインスタンスとスタンバイインスタンスは異なるリージョンに配置される:</strong>
          <br />
          これは誤りです。マルチAZ配置では、プライマリインスタンスとスタンバイインスタンスは同一リージョンの異なるアベイラビリティゾーンに配置されます。
        </li>
        <li className="pt-2">
          <strong>マルチAZ配置では、スタンバイインスタンスは読み取り専用として設定することができる:</strong>
          <br />
          これも誤りです。マルチAZ配置のスタンバイインスタンスは読み取り専用として設定することはできません。
          読み取り専用のレプリカが必要な場合は、リードレプリカを使用する必要があります。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>マルチAZ配置では、バックアップはスタンバイインスタンスから取得されるため、プライマリインスタンスのパフォーマンスに影響を与えない:</strong>
          <br />
          これは正しい説明です。マルチAZ配置では、バックアップはスタンバイインスタンスから取得されるため、プライマリインスタンスのパフォーマンスに影響を与えません。
        </li>
        <li className="pt-2">
          <strong>マルチAZ配置では、フェイルオーバー時に最大60秒のダウンタイムが発生する可能性がある:</strong>
          <br />
          これも正しい説明です。マルチAZ配置では、フェイルオーバー時に最大60秒のダウンタイムが発生する可能性があります。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        Amazon RDSのマルチAZ配置は、データベースの高可用性と耐久性を実現する重要な機能です。
        プライマリインスタンスとスタンバイインスタンスは同一リージョンの異なるアベイラビリティゾーンに配置され、
        スタンバイインスタンスは読み取り専用として設定することはできません。
        バックアップはスタンバイインスタンスから取得され、フェイルオーバー時には最大60秒のダウンタイムが発生する可能性があります。
      </p>
    </div>
  );
} 
