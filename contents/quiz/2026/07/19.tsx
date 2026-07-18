import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Iceberg", "Data Lakehouse", "Datatech News"],
    created_at: new Date("2026-07-19"),
    updated_at: new Date("2026-07-19"),

    title: "Dynamic Iceberg TableのCloneがGA",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Dynamic Iceberg Tableを、新しいDynamic Iceberg Tableへクローンできる。",
      1: "Dynamic Iceberg Tableを、Snowflake管理の（静的な）Iceberg Tableへクローンし、ある時点のスナップショットとして扱える。",
      2: "データベースやスキーマをクローンすると、含まれるDynamic Iceberg Tableも対象になる。以前は静かにスキップされていた。",
      3: "Dynamic Iceberg Tableは通常の（非Iceberg）テーブルへもCLONEでき、データベース／スキーマクローン時は今もDynamic Iceberg Tableが必ず除外される。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Release Notes - Clone dynamic Iceberg tables (GA)",
        url: "https://docs.snowflake.com/en/release-notes/2026/other/2026-07-13-dynamic-iceberg-table-clone",
      },
      {
        title: "Snowflake Documentation - Clone dynamic tables",
        url: "https://docs.snowflake.com/en/user-guide/dynamic-tables/cloning",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        2026年7月13日にGAとなったDynamic Iceberg Tableのクローン機能について、
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
        Dynamic Iceberg Tableは、リフレッシュ付きパイプラインでありつつIceberg形式で外部エンジンからも読めるオブジェクトです。
        Clone対応のGAにより、環境複製や静的スナップショット作成が現実的になりました。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          クローン先はDynamic Iceberg TableかSnowflake管理のIceberg Tableに限られます。
          通常の非IcebergテーブルへのCLONEはできません。またDB/スキーマクローンでもスキップされなくなりました。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>同種のDynamic IcebergへのCLONEで、開発／検証用の複製を作れます。</li>
        <li>静的なIceberg TableへのCLONEは、リフレッシュなしの断面コピーとして使えます（ソースは初期化済みである必要あり）。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        環境ごとDBクローンする運用では、以前スキップされていたDynamic Icebergが突然含まれる点に注意する。
        「動いた複製が欲しい」ならDynamicへ、「止まった断面が欲しい」なら静的Icebergへ、とCLONE先を選ぶと用途が明確です。
      </p>
    </div>
  );
}
