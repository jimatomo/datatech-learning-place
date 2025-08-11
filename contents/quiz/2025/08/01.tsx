import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Arrow", "Data Application", "Pandas", "Polars"],
    created_at: new Date("2025-08-01"),
    updated_at: new Date("2025-08-01"),

    // ----- quiz -----
    title: "Apache Arrowの基本",
    question_jsx: <QuizQuestion />,
    options: {
      0: "言語に依存しないカラムナ（列指向）メモリフォーマットを定義し、異なるシステム間での効率的なデータ交換を可能にする。",
      1: "データコピーやシリアライズ/デシリアライズのオーバーヘッドをなくす「ゼロコピー」なデータアクセスを実現し、処理を高速化する。",
      2: "pandasやPolarsなどのデータ分析ライブラリで、内部的なデータ表現形式として利用が拡大している。",
      3: "CSVやJSONのような、ディスク上にデータを永続的に保存するためのファイルフォーマットである。",
    },
    answers: [0, 1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Apache Arrow Documentation", url: "https://arrow.apache.org/docs/format/Columnar.html" },
      { title: "pandas 2.0 and the Arrow revolution (part I)", url: "https://datapythonista.me/blog/pandas-20-and-the-arrow-revolution-part-i/" },
      { title: "Polars: Arrow producer/consumer", url: "https://docs.pola.rs/user-guide/misc/arrow/" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Apache Arrowに関する記述として、
        <strong className="text-emerald-500">正しいもの</strong>を
        すべて選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-emerald-500">正解の解説：</p>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「言語に依存しないカラムナ（列指向）メモリフォーマットを定義し、異なるシステム間での効率的なデータ交換を可能にする。」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Apache Arrowの核心的な機能です。Python, Java, C++, Rなど、さまざまなプログラミング言語で同じメモリ構造を共有できます。</li>
          <li>これにより、異なるシステムやプロセス間でデータを移動させる際の変換コストが不要になります。</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「データコピーやシリアライズ/デシリアライズのオーバーヘッドをなくす「ゼロコピー」なデータアクセスを実現し、処理を高速化する。」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>シリアライズ（オブジェクトをバイト列に変換）やデシリアライズ（バイト列をオブジェクトに戻す）は、データ交換において大きなボトルネックとなります。</li>
          <li>Arrowは標準化されたインメモリフォーマットを使うことでこの工程を不要にし、複数のライブラリ（例: pandasとPolars）が同じメモリ領域を直接読み書き（ゼロコピー）できるようにします。</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-emerald-500">「pandasやPolarsなどのデータ分析ライブラリで、内部的なデータ表現形式として利用が拡大している。」✅ 正しい：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>pandasはバージョン2.0から、NumPyに加えてArrowをバックエンドとして正式にサポートしました。これにより、メモリ使用量の削減や欠損値の扱いの改善、高速化が実現されています。</li>
          <li>Polarsは当初からApache Arrowを内部的なデータフォーマットとして全面的に採用しており、その高いパフォーマンスの基盤となっています。</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-red-500">「CSVやJSONのような、ディスク上にデータを永続的に保存するためのファイルフォーマットである。」❌ 間違い：</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>これはArrowに関する最も一般的な誤解の一つです。Arrowは**インメモリ（メモリ上）**のフォーマットであり、ディスク上のストレージフォーマットではありません。</li>
          <li>ディスク用のカラムナフォーマットとしてはParquetやORCが存在し、Arrowはこれらのフォーマットと高い親和性を持っています。Arrowのデータをディスクに保存する際は、Feather（ArrowのIPCフォーマット）やParquetがよく使われます。</li>
        </ul>
      </div>

      <div className="bg-green-50 border-l-4 border-emerald-500 p-4 mt-4">
        <p className="text-sm">
          <strong>🎯 まとめ：</strong>
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-green-700">
          <li>Apache Arrowは、高速なデータ分析を実現するための**インメモリ・カラムナフォーマット**です。</li>
          <li>言語の壁を越えて、**ゼロコピー**での効率的なデータ共有を可能にします。</li>
          <li>現代のデータ分析ライブラリにとって、Arrowはパフォーマンスを向上させるための重要な基盤技術となっています。</li>
        </ul>
      </div>
    </div>
  );
}