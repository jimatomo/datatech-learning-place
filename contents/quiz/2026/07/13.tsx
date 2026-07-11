import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Codex",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Performance", "Infrastructure", "Snowflake Basic"],
    created_at: new Date("2026-07-13"),
    updated_at: new Date("2026-07-13"),

    title: "Snowflake Adaptive Warehousesの基本",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Snowflakeがクエリごとのリソース割り当て、スケーリング、クエリルーティングを自動的に調整する。",
      1: "利用者はウェアハウスサイズ、マルチクラスター設定、Query Acceleration Service、サスペンド／再開ポリシーを個別に管理しない。",
      2: "同一アカウント内のAdaptive Warehousesは、そのアカウント専用の共有コンピュートプールへジョブを送る。",
      3: "Standard Warehouseと同様にWAREHOUSE_SIZEとMAX_CLUSTER_COUNTの指定が必須で、すべてのクラウドとリージョンで利用できる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Documentation - Adaptive Compute",
        url: "https://docs.snowflake.com/en/user-guide/warehouses-adaptive",
      },
      {
        title: "Snowflake Release Notes - Adaptive Compute General Availability",
        url: "https://docs.snowflake.com/en/release-notes/2026/other/2026-06-16-adaptive-compute-ga",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflake Adaptive Warehousesの特徴について、
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
        Adaptive Computeは固定的なコンピュートエンジンをワークロード対応型に置き換え、Adaptive Warehouseを通じて利用します。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          Adaptive Warehouseでは<code>WAREHOUSE_SIZE</code>や<code>MAX_CLUSTER_COUNT</code>などのStandard Warehouse用プロパティを設定しません。
          また、Enterprise Edition以上かつ一部のAWSリージョンで利用可能であり、全クラウド・全リージョン対応ではありません。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>Snowflakeがサイジング、スケーリング、クエリルーティングを自動化します。</li>
        <li>複数のAdaptive Warehousesは、他アカウントとは共有されないアカウント専用プールを利用します。</li>
        <li>標準ウェアハウスから停止時間なしで変換することもできます。</li>
      </ul>
    </div>
  );
}
