import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Lakehouse", "Open Table Format", "Big Data"],
    created_at: new Date("2025-03-09"),
    updated_at: new Date("2025-03-09"),

    // ----- quiz -----
    title: "オープンテーブルフォーマットとレイクハウスの技術進化について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Apache Hudiは2016年にUberによって開発され、主にデータレイク上での増分アップサートとストリーミング取り込みを可能にすることを目的としていた",
      1: "Delta Lakeは2017年にNetflixによって開発され、Hiveのスキーマ中心のテーブル形式の限界に対応するために作られた",
      2: "Apache Icebergは2017年頃にNetflixで開発され、Hiveのスキーマ中心のディレクトリ指向のテーブル形式の拡張性とトランザクション処理上の制限に対応するために作られた",
      3: "データレイクハウスは、データレイクの柔軟性とデータウェアハウスのパフォーマンスを組み合わせた統合アーキテクチャである",
    },
    answers: [0, 2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "The History and Evolution of Open Table Formats", url: "https://alirezasadeghi1.medium.com/the-history-and-evolution-of-open-table-formats-0f1b9ea10e1e" },
      { title: "Open Table Formats and the Open Data Lakehouse, In Perspective", url: "https://www.onehouse.ai/blog/open-table-formats-and-the-open-data-lakehouse-in-perspective" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        オープンテーブルフォーマットとデータレイクハウスの技術進化に関する説明として、正しい選択肢を選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        現代のオープンテーブルフォーマットは、データレイク上のデータ管理アプローチの限界に対応するために登場しました。
      </p>
      <p className="py-2">
        <strong>Apache Hudi</strong>は2016年にUberによって開始され、主にデータレイク上での増分アップサートとストリーミング取り込みを可能にすることを目的としていました。そのデザインは変更可能なデータストリームの処理に最適化されています。
      </p>
      <p className="py-2">
        <strong>Apache Iceberg</strong>は2017年頃にNetflixで開発され、Hiveのスキーマ中心のディレクトリ指向のテーブル形式の拡張性と取引上の制限に対応するために作られました。
      </p>
      <p className="py-2">
        <strong>Delta Lake</strong>は2017年にDatabricksによって導入され、2019年にオープンソース化されました。その主な目的は、クラウドオブジェクトストアベースのデータレイク上でACIDトランザクション機能を提供することでした。
      </p>
      <p className="py-2">
        <strong>データレイクハウス</strong>は、データレイクの費用対効果、拡張性、柔軟性、オープン性と、データウェアハウスのパフォーマンス、トランザクション保証、ガバナンス機能を組み合わせた統合アーキテクチャです。
      </p>
      <p className="pt-2">
        オープンテーブルフォーマットは、低コストのクラウドストレージ上でACID、監査、バージョニング、インデックス作成を直接実装することで、従来は別々だったデータ管理パラダイム間のギャップを埋めるデータレイクハウスの基盤となっています。
      </p>
    </div>
  );
} 
