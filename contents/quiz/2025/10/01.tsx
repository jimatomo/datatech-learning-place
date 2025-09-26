import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "Snowflake", "Databricks", "Data Modeling"],
    created_at: new Date("2025-10-01"),
    updated_at: new Date("2025-10-01"),

    // ----- quiz -----
    title: "dbtのpersist_docs設定",
    question_jsx: <QuizQuestion />,
    options: {
      0: "persist_docsは、モデルのdescriptionをデータベースのテーブルコメントとして永続化できる。",
      1: "Snowflakeでは、カラム名に大文字と小文字が混在している場合、YMLファイルでquote: trueを設定することで、カラムコメントを永続化できる。",
      2: "Databricksでカラムコメントを永続化する場合、file_formatがdeltaである必要がある。",
      3: "persist_docsは、sourcesリソースに対しても設定でき、データベースのソーステーブルにコメントを永続化できる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "dbt Docs: persist_docs",
        url: "https://docs.getdbt.com/reference/resource-configs/persist_docs",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        dbtのpersist_docs設定に関する記述として、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">
        間違っている記述（正答）:
      </p>
      <p className="my-2">
        dbtの公式ドキュメントによると、persist_docsはsourcesリソースには実装されていません。モデル、シード、スナップショットでサポートされています。したがって、「persist_docsは、sourcesリソースに対しても設定でき...」という記述は誤りです。
      </p>
      <hr className="my-2" />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2 space-y-1">
        <li>
          persist_docsのrelation:
          trueを設定することで、モデルのdescriptionがデータベースのテーブルコメントとして永続化されます。
        </li>
        <li>
          Snowflakeでは、大文字小文字が混在するカラム名を扱う際に、YMLファイルでquote:
          trueを指定しないとカラムコメントが永続化されないというプラットフォーム特有の仕様があります。
        </li>
        <li>
          Databricksでカラムレベルのコメントを永続化するには、file_formatがdelta（または他のv2フォーマット）である必要があります。
        </li>
      </ul>
    </div>
  );
}