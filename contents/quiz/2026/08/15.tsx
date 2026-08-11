import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Governance", "Data Architecture", "Operation", "Data Management"],
    created_at: new Date("2026-08-15"),
    updated_at: new Date("2026-08-15"),

    title: "データリネージの目的と限界",
    question_jsx: <QuizQuestion />,
    options: {
      0: "データの起源、変換、移動、利用先を追跡・可視化し、データのライフサイクルを把握するための仕組みである。",
      1: "影響分析や障害時の切り分け、監査証跡の提示など、ガバナンスと運用の双方で使われる。",
      2: "リネージはデータがどう流れたかを示す地図であり、ビジネス用語の定義や品質ルールそのものを自動で保証するわけではない。",
      3: "リネージさえ整備すれば、データオーナーシップや品質基準の定義は不要になり、データガバナンスプログラム全体を置き換えられる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "IBM - What Is Data Lineage?",
        url: "https://www.ibm.com/think/topics/data-lineage",
      },
      {
        title: "Google Cloud - What is data lineage?",
        url: "https://cloud.google.com/discover/what-is-data-lineage",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        データリネージ（data lineage）について、
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
        リネージは「データの旅路」を見える化する道具であり、ガバナンスそのものではありません。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          オーナーシップ、用語定義、品質基準、アクセス方針などはガバナンス側の責務です。
          リネージはそれらを支える可視化・証跡であり、プログラム全体の代替にはなりません。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>起源から利用までの流れを追跡します。</li>
        <li>影響分析や監査に使えます。</li>
        <li>意味定義や品質保証までは自動では担いません。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        リネージで「どこから来てどこへ行くか」を見て、品質や意味の問題は別レイヤで扱う。
        地図があることと、目的地の正しさが保証されることは別です。
      </p>
    </div>
  );
}
