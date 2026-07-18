import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Architecture", "Data Storage", "Data Management", "Data Modeling"],
    created_at: new Date("2026-07-22"),
    updated_at: new Date("2026-07-22"),

    title: "Periodic Snapshot Fact Tableの使い所",
    question_jsx: <QuizQuestion />,
    options: {
      0: "1行は、日・週・月などの標準期間に発生した測定を要約したもので、grainは個々のトランザクションではなく期間である。",
      1: "在庫残高や口座残高のように、ある時点の状態を定期的に切り出して比較したい分析に向いている。",
      2: "期間中に活動がなくても、通常はゼロやNULLのfactを持つ行を挿入し、キー空間を均一に保つ。",
      3: "受注から出荷・配達までの工程進捗を、受注明細ごとに1行で更新しながら追う用途の第一候補である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Kimball Group - Periodic Snapshot Fact Tables",
        url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/periodic-snapshot-fact-table/",
      },
      {
        title: "Kimball Group - Complementary Fact Table Types",
        url: "https://www.kimballgroup.com/2014/06/design-tip-167-complementary-fact-table-types/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        キンボール流のPeriodic Snapshot Fact Tableについて、
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
        Periodic Snapshotは「決まった周期で、その時点の状態や期間集計を切り出す」Factです。
        先週扱ったAccumulating Snapshot（工程pipelineを1行で更新）とは役割が異なります。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          受注フルフィルメントのような予測可能な工程の進捗追跡は、Accumulating Snapshotの典型用途です。
          Periodic Snapshotは日次の出荷待ち件数や在庫残高等、「各時点の断面」向きです。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>grainは期間（と対象エンティティ）であり、個々のイベント行ではありません。</li>
        <li>活動ゼロの日でも行を残すことで、時系列比較やカバレッジの穴を防ぎます。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「いまどこまで進んだか」を見るならAccumulating、「ある日の残高・滞留量はどうだったか」を見るならPeriodic、
        と問いの形からFactタイプを選ぶと設計がブレにくいです。
      </p>
    </div>
  );
}
