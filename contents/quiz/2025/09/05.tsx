import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "Semantic Layer", "Data Application"],
    created_at: new Date("2025-09-05"),
    updated_at: new Date("2025-09-05"),

    // ----- quiz -----
    title: "dbt MetricFlowの基本機能",
    question_jsx: <QuizQuestion />,
    options: {
      0: "MetricFlowは、dbtプロジェクト内でメトリクスを定義し、効率的にクエリするためのSQLクエリ生成ツールである。",
      1: "セマンティックモデルは、Entities、Dimensions、Measuresの3つの主要なメタデータで構成される。",
      2: "dbtバージョン1.6以上で利用可能であり、Snowflake、BigQuery、Redshiftなどのデータプラットフォームをサポートしている。",
      3: "MetricFlowはdbtの組み込み関数やJinjaを使用するパッケージを完全にサポートしており、複雑なマクロも利用できる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "About MetricFlow", url: "https://docs.getdbt.com/docs/build/about-metricflow" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        dbtのMetricFlowに関する説明として、<strong className="text-red-600">誤っているもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
      <p className="py-2">
        「MetricFlowはdbtの組み込み関数やJinjaを使用するパッケージを完全にサポートしており、複雑なマクロも利用できる」は誤りです。公式ドキュメントには下記のように記載されており、dbtの組み込み関数やパッケージはサポートされていません。
      </p>
      <CodeBlock code={"MetricFlow doesn't support dbt builtin functions or packages at this time, however, support is planned for the future."} showLineNumbers={false} />

      <p className="font-semibold text-green-600 pt-2">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <b>SQLクエリ生成ツール:</b> MetricFlowは、一貫性のあるメトリクス定義（YAML）に基づいてSQLクエリを動的に生成し、データコンシューマーが迅速かつ効率的にデータセットを取得できるようにします。
        </li>
        <li>
          <b>セマンティックモデルの構成要素:</b> セマンティックモデルは、テーブル間の結合キーとなるEntities、メトリクスをグループ化・分割するためのDimensions、集計関数を定義するMeasuresの3つの主要な要素で構成されます。
        </li>
        <li>
          <b>サポートバージョンとプラットフォーム:</b> MetricFlowを利用するにはdbt v1.6以上が必要で、Snowflake, BigQuery, Databricks, Redshift, そしてPostgres (dbt Coreのみ) でサポートされています。
        </li>
      </ul>
    </div>
  );
}

