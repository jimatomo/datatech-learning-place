import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "S3 Tables", "Iceberg", "Infrastructure"],
    created_at: new Date("2026-07-23"),
    updated_at: new Date("2026-07-23"),

    title: "Amazon S3 Tablesの位置づけ",
    question_jsx: <QuizQuestion />,
    options: {
      0: "表形式データを扱うための専用ストレージで、データはtable bucketという新しいバケット種別のサブリソースとして保持される。",
      1: "テーブルはApache Iceberg形式で格納され、AthenaやRedshift、SparkなどIceberg対応エンジンからSQLで問い合わせできる。",
      2: "compaction、snapshot管理、未参照ファイル削除などのテーブルメンテナンスをS3が自動実行し、運用負荷を下げられる。",
      3: "S3 Tablesは通常の汎用S3バケット上に自分で置いたIcebergテーブルと同一の仕組みで、table bucketという概念はなく、メンテナンスもすべて利用者実装が必須である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Amazon S3 User Guide - Working with Amazon S3 Tables and table buckets",
        url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-tables.html",
      },
      {
        title: "Amazon S3 - Tabular Data Storage At Scale (S3 Tables)",
        url: "https://aws.amazon.com/s3/features/tables/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Amazon S3 Tablesについて、
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
        S3 Tablesは、分析向けの表形式データ用に最適化されたマネージドIcebergテーブルです。
        汎用バケットに自分でIcebergを置く構成とは、バケット種別と運用の責任分界が異なります。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          S3 Tablesはtable bucket上にテーブルをサブリソースとして持ち、自動メンテナンスを提供します。
          「汎用バケットと同じでtable bucketはない」は誤りです。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>Iceberg形式で保存し、対応エンジンからSQLクエリできます。</li>
        <li>compaction等を継続的に実行し、クエリ性能とストレージコストの最適化を支援します。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「オブジェクト置き場」としてS3を使うのか、「表の運用まで含めて任せたい」のかで選ぶ。
        後者でIceberg運用の手間を減らしたいならS3 Tables、エンジン横断の細かい制御を自前で持ちたいなら汎用バケット＋自前メンテナンス、が判断軸です。
      </p>
    </div>
  );
}
