import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "Snowflake", "Data Quality", "Data Modeling"],
    created_at: new Date("2025-09-10"),
    updated_at: new Date("2025-09-10"),

    // ----- quiz -----
    title: "dbtのModel Contractにおける制約の強制",
    question_jsx: <QuizQuestion />,
    options: {
      0: "primary_key",
      1: "not_null",
      2: "unique",
      3: "foreign_key",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Model contracts | dbt Docs", url: "https://docs.getdbt.com/docs/mesh/govern/model-contracts" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflake環境でdbtのModel Contractを利用する際、<code>dbt build</code>の実行時に
        <strong className="text-green-600">強制（enforced）</strong>
        される制約は次のうちどれですか？正しいものを1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm space-y-4">
      <p>
        dbtのModel Contractでは、データプラットフォームごとにサポートされる制約とその強制レベルが異なります。
      </p>
      <p>
        Snowflake環境において、<code>dbt build</code>実行時にdbtによって<strong className="text-green-600">強制（enforced）</strong>されるのは <code>not_null</code> 制約のみです。モデルのビルド時に<code>not_null</code>制約に違反するデータが含まれている場合、ビルドは失敗します。
      </p>

      <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
        <p className="font-semibold mb-2">Snowflakeにおける各制約のサポート状況:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>not_null:</strong> ✅ 定義可能 (Definable) かつ ✅ 強制 (Enforced)
            </li>
            <li>
              <strong>primary_key:</strong> ✅ 定義可能 (Definable) だが ❌ 強制されない (Not Enforced)
            </li>
            <li>
              <strong>foreign_key:</strong> ✅ 定義可能 (Definable) だが ❌ 強制されない (Not Enforced)
            </li>
            <li>
              <strong>unique:</strong> ✅ 定義可能 (Definable) だが ❌ 強制されない (Not Enforced)
            </li>
             <li>
              <strong>check:</strong> ❌ 定義不可能 (Not Definable)
            </li>
        </ul>
      </div>

      <p>
        <code>primary_key</code>、<code>foreign_key</code>、<code>unique</code>制約は定義することは可能ですが、Snowflake上では情報提供やメタデータとしての役割に留まり、ビルド時に違反があってもエラーにはなりません。これらの制約をテストしたい場合は、別途dbtのデータテスト（例: <code>unique</code>, <code>relationships</code>）を利用する必要があります。
      </p>
    </div>
  );
}