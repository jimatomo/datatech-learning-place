import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "S3", "S3 Tables", "Iceberg"],
    created_at: new Date("2025-02-02"),
    updated_at: new Date("2025-02-02"),

    // ----- quiz -----
    title: "Amazon S3 Tablesについて",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Apache Icebergサポートが組み込まれた初めてのクラウドオブジェクトストアである",
      1: "アンマネージド型のIcebergテーブル（最適化処理がされていない状態）と比較してクエリパフォーマンスが最大3倍高速になるとされている",
      2: "テーブルメンテナンスタスクは手動で実行する必要がある",
      3: "Amazon Athena、Redshift、EMRなどのAWSサービスと統合できる",
      4: "Amazon Data Firehoseを使用してデータをAmazon S3 Tablesにストリーミングできる",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Amazon S3 Tables が追加の 5 AWS リージョンで利用可能に", url: "https://aws.amazon.com/jp/about-aws/whats-new/2025/01/amazon-s3-tables-additional-aws-regions/" },
      { title: "Amazon S3 Tables", url: "https://aws.amazon.com/jp/s3/features/tables/" },
      { title: "Amazon S3 の新しいテーブル: 分析ワークロードのために最適化されたストレージ", url: "https://aws.amazon.com/jp/blogs/news/new-amazon-s3-tables-storage-optimized-for-analytics-workloads/" },
      { title: "Streaming data to tables with Amazon Data Firehose", url: "https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/s3-tables-integrating-firehose.html" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        2025年1月に東京リージョンで提供が開始されたAmazon S3 Tablesについて、
        <span className="text-red-500">正しくない説明</span>を選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        選択肢2が誤りです。S3 Tablesは以下のテーブルメンテナンスタスクを自動的に実行します：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          圧縮：64 MiB～512 MiBの範囲で設定可能なターゲットファイルサイズになるように、
          複数の小さなテーブルオブジェクトを1つの大きなオブジェクトに結合してクエリパフォーマンスを改善します。
        </li>
        <li className="pb-1">
          スナップショット管理：保持するスナップショットの最小数と保持するスナップショットの最大存続期間の
          設定オプションを使用して、テーブルスナップショットを期限切れにし、最終的に削除します。
        </li>
        <li className="pb-1">
          参照されていないファイルの削除：どのテーブルスナップショットによっても参照されていない
          オブジェクトを削除します。
        </li>
      </ul>
      <p>
        その他の選択肢は全て正しい説明です：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li className="pb-1">
          S3 TablesはApache Icebergサポートが組み込まれた初めてのクラウドオブジェクトストアです。
        </li>
        <li className="pb-1">
          アンマネージド型のIcebergテーブルと比較してクエリパフォーマンスが最大3倍高速になります。
        </li>
        <li className="pb-1">
          AWS Glueデータカタログとの統合を通じて、Amazon Athena、Redshift、EMRなどの
          AWSサービスと統合できます（現在プレビュー段階）。
        </li>
        <li className="pb-1">
          Amazon Data Firehoseを使用してデータをAmazon S3 Tablesにストリーミングできます。
        </li>
      </ul>
    </div>
  );
} 
