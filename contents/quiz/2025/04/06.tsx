import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["DuckDB", "dbt", "ETL", "Datatech News"],
    created_at: new Date("2025-04-06"),
    updated_at: new Date("2025-04-06"),

    // ----- quiz -----
    title: "DuckDBとdbtを活用したETLパイプラインの特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "DuckDBとdbtの組み合わせにより、メモリ内での高速なデータ処理が可能になる",
      1: "dbt-duckdbアダプターを使用することで、PostgreSQLやMySQLへのデータ書き出しが可能",
      2: "DuckDBは外部データソースとの連携が苦手で、ETLパイプラインには不向き",
      3: "dbtの機能を活用することで、データのテストやドキュメント生成が自動化できる",
    },
    answers: [0, 1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Transforming Data with DuckDB and dbt", url: "https://duckdb.org/2025/04/04/dbt-duckdb.html" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        DuckDBとdbtを組み合わせたETLパイプラインの特徴として、正しい選択肢を全て選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        DuckDBとdbtを組み合わせたETLパイプラインの主な特徴は以下の通りです：
      </p>
      <p className="py-2">
        <strong>高速なデータ処理</strong>：
        <ul className="list-disc pl-4">
          <li>DuckDBはインメモリ分析エンジンとして高速な処理が可能</li>
          <li>dbtとの組み合わせにより、データ変換パイプラインの効率化が実現</li>
          <li>複数のスレッドを使用した並列処理が可能</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>柔軟なデータ連携</strong>：
        <ul className="list-disc pl-4">
          <li>外部データベース（PostgreSQL、MySQL）との連携が可能</li>
          <li>CSV、JSON、Parquetなどの様々なファイル形式に対応</li>
          <li>HTTPやS3などのリモートデータソースにもアクセス可能</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>データ品質管理</strong>：
        <ul className="list-disc pl-4">
          <li>dbtの機能を活用したデータテストの自動化</li>
          <li>データのドキュメント生成と管理</li>
          <li>データの血統（lineage）の追跡が可能</li>
        </ul>
      </p>
      <p className="pt-4">
        この組み合わせにより、データエンジニアリングのワークフローが大幅に効率化され、
        データ品質の向上と保守性の改善が期待できます。
      </p>
    </div>
  );
} 
