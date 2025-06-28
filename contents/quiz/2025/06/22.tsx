import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Data Modeling", "Semantic Views", "Datatech News"],
    created_at: new Date("2025-06-22"),
    updated_at: new Date("2025-06-22"),

    // ----- quiz -----
    title: "Snowflake Semantic Viewの構成要素",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Facts：ビジネスイベントやトランザクションを表す行レベルの属性で、個別の売上金額や購入数量などの詳細データを示す。",
      1: "Metrics：複数行のファクトや他の列をSUM、AVG、COUNTなどの関数で集計して計算される定量的なビジネス指標。",
      2: "Dimensions：カテゴリー属性で、購入日や顧客詳細、製品カテゴリーなど、メトリクスに意味を与えるコンテキストを提供する。",
      3: "Semantic viewを作成する際は、Facts、Dimensions、Metrics、Relationshipsの全ての構成要素を必ず定義する必要がある。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "CREATE SEMANTIC VIEW | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/sql-reference/sql/create-semantic-view",
      },
      {
        title: "Overview of semantic views | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/views-semantic/overview",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Snowflakeのsemantic viewにおける構成要素に関する記述として、
        <span className="text-red-500">間違っている</span>ものはどれですか？
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        選択肢の中で間違っているものは次のとおりです。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「Semantic viewを作成する際は、Facts、Dimensions、Metrics、Relationshipsの全ての構成要素を必ず定義する必要がある。」
          </strong>
          ：これは間違った記述です。Snowflakeのドキュメントによると、semantic viewでは少なくとも1つのdimensionまたはmetricを定義する必要がありますが、Facts、Dimensions、Metrics、Relationshipsの全てを必ず定義する必要はありません。必須なのはTABLES句のみで、他の構成要素（RELATIONSHIPS、FACTS、DIMENSIONS、METRICS）はオプションです。
        </li>
      </ul>
      <p className="py-2">その他の選択肢は正しい記述です：</p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>
            「Facts：ビジネスイベントやトランザクションを表す行レベルの属性で、個別の売上金額や購入数量などの詳細データを示す。」
          </strong>
          ：これは正しい記述です。Factsは特定のビジネスイベントやトランザクションを表す行レベルのデータで、「いくら」や「いくつ」を最粒度レベルで示します。
        </li>
        <li className="pb-2">
          <strong>
            「Metrics：複数行のファクトや他の列をSUM、AVG、COUNTなどの関数で集計して計算される定量的なビジネス指標。」
          </strong>
          ：これは正しい記述です。Metricsは生データを意味のあるビジネス指標に変換し、Total RevenueやProfit Margin Percentageなどのビジネス判断を推進するKPIを表します。
        </li>
        <li className="pb-2">
          <strong>
            「Dimensions：カテゴリー属性で、購入日や顧客詳細、製品カテゴリーなど、メトリクスに意味を与えるコンテキストを提供する。」
          </strong>
          ：これは正しい記述です。Dimensionsは「誰が」「何を」「どこで」「いつ」の質問に答え、ユーザーが複数の視点からデータをフィルタリング、グループ化、分析できるようにします。
        </li>
      </ul>
      <p className="pt-2">
        なお、Relationshipsも有効な構成要素で、論理テーブル間の結合を定義することができます。Semantic viewは、物理的データにビジネス的意味を追加することで、データ駆動型の意思決定を向上させ、企業アプリケーション全体で一貫したビジネス定義を提供します。
      </p>
    </div>
  );
} 
