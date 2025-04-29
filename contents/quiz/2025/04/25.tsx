import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Polars", "Pandas", "Data Processing", "Data Application"],
    created_at: new Date("2025-04-25"),
    updated_at: new Date("2025-04-25"),
    title: "PolarsとPandasの比較",
    question_jsx: <QuizQuestion />,
    options: {
      0: "PolarsはRustで書かれており、一般的なワークロードでpandasよりも高速に動作する",
      1: "Polarsはメモリ使用量がpandasよりも少ない",
      2: "Polarsはpandasと完全に互換性があり、同じAPIを使用できる",
      3: "Polarsは並列処理をサポートしており、複数コアを効率的に活用できる",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Polars vs. pandas – Python のデータフレームライブラリを徹底比較", url: "https://blog.jetbrains.com/ja/pycharm/2025/02/polars-vs-pandas/" },
      { title: "Polars documentation", url: "https://pola.rs/" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Polarsは、Pythonでデータ分析を行うためのPandasライクなデータフレームライブラリです。
        以下の選択肢から、Polarsの特徴として<span className="text-red-500">誤っているもの</span>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        PolarsとPandasの主な違いについて解説します。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>PolarsはRustで書かれており、pandasよりも高速に動作する：</strong>
          <br />
          PolarsはRustで実装されており、CやC++と同等の速度で動作します。
          一方、pandasはPythonライブラリを基盤に構築されており、特定の型の処理でパフォーマンスが低下する場合があります。
        </li>
        <li className="pt-2">
          <strong>Polarsはメモリ使用量がpandasよりも少ない：</strong>
          <br />
          Polarsはメモリ効率が良く、同じデータセットを処理する際にpandasよりも少ないメモリを使用します。
          pandasではデータセットサイズの約5～10倍のRAMが必要なのに対し、Polarsでは約2～4倍で済みます。
        </li>
        <li className="pt-2">
          <strong>Polarsは並列処理をサポートしており、複数コアを効率的に活用できる：</strong>
          <br />
          Polarsは安全な並行性を実現しており、複数の列を扱う複雑なクエリでも全てのマシンのコアを安全に使用できます。
          これにより、pandasよりも圧倒的に高いパフォーマンスを実現しています。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">間違っている選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>Polarsはpandasと完全に互換性があり、同じAPIを使用できる：</strong>
          <br />
          Polarsはpandasとは異なるAPIを持っています。例えば、フィルタリングやグループ化の構文が異なります。
          Polarsは独自の最適化されたAPIを提供しています。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        Polarsは、Rustによる実装、メモリ効率の良さ、並列処理のサポートなど、
        パフォーマンスを重視した設計が特徴です。一方、pandasはより成熟したエコシステムと
        広範な機能を提供しています。用途に応じて適切なライブラリを選択することが重要です。
      </p>
    </div>
  );
} 