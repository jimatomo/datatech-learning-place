import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Performance", "Data Storage", "Snowflake Advanced"],
    created_at: new Date("2026-08-04"),
    updated_at: new Date("2026-08-04"),

    title: "Hybrid Tablesの位置づけ",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Hybrid Tablesは行指向のプライマリストレージを持ち、低レイテンシ・高スループットのランダム読み書き向けに最適化されている。",
      1: "PRIMARY KEYは必須で強制され、FOREIGN KEYやUNIQUEも標準テーブルと異なり強制される。",
      2: "ロックは行レベルで行われ、高並行の更新に向いている。",
      3: "大規模な分析スキャンはHybrid Tablesの方が標準テーブルより常に高速であり、分析専用DWHテーブルはすべてHybridに置き換えるのが推奨である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake - Hybrid tables",
        url: "https://docs.snowflake.com/en/user-guide/tables-hybrid",
      },
      {
        title: "Snowflake - Getting started with hybrid tables",
        url: "https://docs.snowflake.com/en/user-guide/tutorials/getting-started-with-hybrid-tables-tutorial",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowflakeのHybrid Tablesについて、
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
        Hybrid TablesはUnistoreワークロード向けのテーブル型で、トランザクション寄りの操作と分析を同一プラットフォームで扱えるようにします。
        ただし用途の向き不向きは明確です。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          大規模な分析クエリでは標準テーブルの方が一般に高性能です。
          Hybridは点読み・高並行書き込み向きで、分析専用の大量スキャンをすべて置き換える設計ではありません。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>プライマリは行ストアで、書き込み後にオブジェクトストレージへ非同期コピーされます。</li>
        <li>PRIMARY KEY必須・制約強制により、トランザクション整合性を保てます。</li>
        <li>行ロックにより、同一テーブルへの高並行更新に耐えます。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「1行単位で頻繁に更新する状態テーブル」はHybrid、「まとめてロードして大きく集計する分析テーブル」は標準、
        と役割分担するのが基本です。同一DB内で混在させ、クエリ特性で選ぶのが実務的な使い方です。
      </p>
    </div>
  );
}
