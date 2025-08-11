import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Lakehouse", "Delta Lake", "Infrastructure"],
    created_at: new Date("2025-06-19"),
    updated_at: new Date("2025-06-19"),

    // ----- quiz -----
    title: "データレイクハウス実装における Delta Lake vs Apache Iceberg",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Delta Lake は Databricks が開発したオープンソースプロジェクトで、Apache Spark との統合が深い",
      1: "Apache Iceberg は Netflix が開発し、複数の処理エンジン（Spark、Flink、Trino等）をサポートする",
      2: "両者とも ACID トランザクションとタイムトラベル機能を提供する",
      3: "Delta Lake は独自のメタデータ形式を使用するため、他のエンジンからの直接アクセスは不可能である",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Delta Lake Official Documentation", url: "https://docs.delta.io/" },
      { title: "Apache Iceberg Official Documentation", url: "https://iceberg.apache.org/" },
      { title: "Delta Universal Format (UniForm)", url: "https://docs.delta.io/latest/delta-uniform.html" },
      { title: "Open Table Formats Comparison", url: "https://www.onehouse.ai/blog/apache-hudi-vs-delta-lake-vs-apache-iceberg-lakehouse-feature-comparison" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        データレイクハウスアーキテクチャにおける Delta Lake と Apache Iceberg の比較に関する記述のうち、
        <strong className="text-red-500">間違っているもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  const deltaLakeExample = `
-- Delta Lake でのタイムトラベル
SELECT * FROM my_table VERSION AS OF 1
SELECT * FROM my_table TIMESTAMP AS OF '2025-06-19'

-- Delta Lake での最適化
OPTIMIZE my_table
VACUUM my_table RETAIN 168 HOURS
  `.trim();

  const icebergExample = `
-- Apache Iceberg でのタイムトラベル
SELECT * FROM my_table FOR SYSTEM_TIME AS OF '2025-06-19 10:00:00'
SELECT * FROM my_table FOR SYSTEM_VERSION AS OF 12345

-- Apache Iceberg でのスキーマ進化
ALTER TABLE my_table ADD COLUMN new_column STRING
  `.trim();

  return (
    <div className="text-xs md:text-sm">
      <p className="py-2 font-semibold text-red-500">間違った選択肢について：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>「Delta Lake は独自のメタデータ形式を使用するため、他のエンジンからの直接アクセスは不可能である」</strong>
          <br />
          これは間違った記述です。Delta Lake は <strong>Delta Universal Format (UniForm)</strong> という機能を提供しており、
          Delta テーブルを Iceberg や Hudi 形式としても同時に公開できます。これにより、Spark 以外のエンジン（Trino、Presto、Flink等）
          からも Delta Lake テーブルにアクセスすることが可能です。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢について：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Delta Lake の特徴：</strong>
          <br />
          Databricks が開発したオープンソースプロジェクトで、Apache Spark とのネイティブ統合が特徴です。
          ACID トランザクション、スキーマエンフォースメント、タイムトラベル機能を提供します。
        </li>
        <li>
          <strong>Apache Iceberg の特徴：</strong>
          <br />
          Netflix が開発し、現在は Apache Software Foundation で管理されています。
          エンジン非依存の設計で、Spark、Flink、Trino、Presto など複数の処理エンジンをサポートします。
        </li>
        <li>
          <strong>共通機能：</strong>
          <br />
          両者とも ACID トランザクション、タイムトラベル、スキーマ進化、パーティション進化などの
          モダンなデータレイクハウス機能を提供します。
        </li>
      </ul>

      <p className="pt-4">
        <strong>Delta Lake の使用例：</strong>
      </p>
      <CodeBlock code={deltaLakeExample} />

      <p className="pt-4">
        <strong>Apache Iceberg の使用例：</strong>
      </p>
      <CodeBlock code={icebergExample} />

      <p className="pt-4">
        <strong>選択の指針：</strong>
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Delta Lake：</strong> Spark エコシステム中心、Databricks との統合重視の場合</li>
        <li><strong>Apache Iceberg：</strong> マルチエンジン対応、ベンダー非依存を重視する場合</li>
        <li><strong>Apache Hudi：</strong> 増分処理とupsert操作を頻繁に行う場合</li>
      </ul>

      <p className="pt-2">
        データレイクハウス実装では、組織の技術スタック、パフォーマンス要件、
        運用体制を総合的に考慮してテーブル形式を選択することが重要です。
      </p>
    </div>
  );
}