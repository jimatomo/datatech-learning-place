import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DuckDB", "SQL", "DataTech News"],
    created_at: new Date("2025-08-24"),
    updated_at: new Date("2025-08-24"),

    // ----- quiz -----
    title: "DuckDBのSpatial Joinを高速化する中核技術",
    question_jsx: <QuizQuestion />,
    options: {
      0: "B-tree Index",
      1: "Hash Index",
      2: "R-tree Index",
      3: "Bitmap Index",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Spatial Joins in DuckDB",
        url: "https://duckdb.org/2025/08/08/spatial-joins",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        DuckDB v1.3.0で導入された<code>SPATIAL_JOIN</code>オペレータは、従来のNested Loop Joinに代わり、特定の空間インデックスを利用することで性能を大幅に向上させました。この高速化を実現している<strong className="text-green-600">主要な技術</strong>は次のうちどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        正解は <strong>R-tree Index</strong> です。
      </p>
      <p className="font-semibold text-green-600 mt-2">解説:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          DuckDBの新しい<code>SPATIAL_JOIN</code>オペレータは、<strong>R-tree</strong>という空間インデックスを内部で構築して利用します。R-treeは、多次元データ（例：地理的座標）を効率的に扱うためのツリーデータ構造です。(RはrectangularのR)
        </li>
        <li>
          具体的には、JOINの一方のテーブル（通常はポリゴンのような領域データを持つ小さい方）からR-treeインデックスをメモリ上に構築します。その後、もう一方のテーブル（通常はポイントデータのような大量のデータ）の各ジオメトリを使ってインデックスを探索（プローブ）します。
        </li>
        <li>
          この方法により、ジオメトリの最小境界矩形（MBR）を使用して、明らかに交差しないペアを計算コストの高い詳細な判定を行う前に素早く除外できます。これにより、全ペアを比較するNested Loop Joinと比較して、計算量を劇的に削減し、高速なSpatial Joinを実現しています。
        </li>
      </ul>
      <p className="font-semibold text-red-500 mt-2">他の選択肢について:</p>
      <ul className="list-disc pl-4 py-2">
        <li><strong>B-tree Index</strong>は、一次元の順序付けられたデータの範囲検索やポイント検索に適しており、空間データには直接適用されません。</li>
        <li><strong>Hash Index</strong>は、主に等価比較（=）を高速化するためのもので、空間的な関係（含む、交差するなど）の検索には使用されません。</li>
        <li><strong>Bitmap Index</strong>は、カーディナリティの低い列に対するクエリで効果的ですが、複雑な空間データのインデックスには適していません。</li>
      </ul>
    </div>
  );
}


