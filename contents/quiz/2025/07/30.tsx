import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Modeling", "Snowflake"],
    created_at: new Date("2025-07-30"),
    updated_at: new Date("2025-07-30"),

    // ----- quiz -----
    title: "Snowflakeの分析用途で、適用可能なデータモデリング手法",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ディメンショナルモデリング (キンボールモデル)",
      1: "第3正規形 (インモンモデル)",
      2: "Data Vault",
      3: "Graph Model",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Kimball Group: Dimensional Modeling Techniques",
        url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/",
      },
      {
        title: "Data Vault Series 1 – Data Vault Overview",
        url: "https://tdan.com/data-vault-series-1-data-vault-overview/5054",
      },
      {
        title: "Neo4j: Graph modeling guidelines",
        url: "https://neo4j.com/docs/getting-started/data-modeling/guide-data-modeling/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-2">
        Snowflakeは、分析クエリのパフォーマンスを最適化するために設計されたクラウドデータプラットフォームです。
        データウェアハウスを構築する際には、様々なデータモデリング手法が存在します。
      </p>
      <p className="pb-2">
        これらの手法のうち、Snowflakeが主戦場とする分析ワークロードにおいて、アーキテクチャ上の特性から
        <strong className="text-red-500">
          最も適していないと考えられるモデリング手法
        </strong>
        は次のうちどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        正解は <strong className="text-emerald-500">Graph Model</strong> です。
      </p>

      <p className="py-2">
        Snowflakeはリレーショナルモデルをベースとした列指向の分析データベースです。そのため、エンティティ間の複雑な関係性を表現するグラフモデルは、Snowflakeの主要なアーキテクチャとは根本的に異なります。
        再帰CTEなどを使えば階層的なデータ構造を扱うことも可能ですが、これはネイティブなグラフ処理ではなく、パフォーマンスや表現力に限界があります。したがって、分析用途において最も適していないのはグラフモデルです。
      </p>

      <p className="py-2">
        <strong>各選択肢の解説：</strong>
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>ディメンショナルモデリング (キンボールモデル): 誤答</strong>
          <br />
          この手法は、分析クエリのパフォーマンスとビジネスユーザーの理解しやすさを最大化するため、Snowflake環境における分析レイヤーの事実上の標準です。したがって、問題の趣旨（適していない手法）とは逆の、最も適した手法であるため誤答となります。
        </li>
        <li className="pb-2">
          <strong>第3正規形 (インモンモデル): 誤答</strong>
          <br />
          インモンモデルは、データの重複を排除し一貫性を保つために、データ統合レイヤーで利用される堅牢な手法です。しかし、分析クエリには多くのJOINが必要となりパフォーマンスが低下するため、分析用途には直接適しているとは言えません。ただし、グラフモデルほど根本的にアーキテクチャが異なるわけではないため、最も不適切な選択肢ではありません。
        </li>
        <li className="pb-2">
          <strong>データヴォールト: 誤答</strong>
          <br />
          データヴォールトは、複数のソースからのデータをアジャイルに統合し、監査証跡を保持するのに優れた手法です。主にデータの統合と保存を目的としており、そのままでは分析に適していません。これも分析用途には直接的ではありませんが、グラフモデルほどアーキテクチャのミスマッチはありません。
        </li>
        <li className="pb-2">
          <strong className="text-emerald-500">グラフモデル: 正解</strong>
          <br />
          グラフモデルは、エンティティ間の複雑な関係性（例：SNSの友人関係）を扱うのに特化しています。Snowflakeはリレーショナルモデルがベースであり、ネイティブなグラフデータベースではないため、そのアーキテクチャの利点を活かせません。そのため、分析用途には最も適していない手法です。
        </li>
      </ul>
    </div>
  );
}