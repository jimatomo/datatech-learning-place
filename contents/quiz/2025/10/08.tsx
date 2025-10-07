import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "Data Engineering", "Analytics Engineering"],
    created_at: new Date("2025-10-08"),
    updated_at: new Date("2025-10-08"),

    // ----- quiz -----
    title: "dbt buildとrun/test/snapshot/seedの違い",
    question_jsx: <QuizQuestion />,
    options: {
      0: "dbt buildは、選択されたノードに対してseed・run・snapshot・testを依存グラフ順にまとめて実行する。",
      1: "dbt runはテストノードやスナップショットノードも含めて全て構築するため、dbt buildを実行しても追加で得られるものはない。",
      2: "dbt buildでは、モデルやスナップショットの実行が失敗した場合、そのノードに依存するテストはスキップされ、コマンド全体が失敗として扱われる。",
      3: "dbt seed単体で実行するとCSVシードに紐づくテストも自動実行されるが、dbt buildではシードに対するテストは実行されない。",
    },
    answers: [0, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "About dbt build command | dbt Developer Hub",
        url: "https://docs.getdbt.com/reference/commands/build",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        dbt buildコマンドの挙動と、dbt run / dbt snapshot / dbt seed / dbt testの違いについて、
        <strong className="text-green-600">正しい記述を2つ</strong>
        選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-green-600">正しい記述（正答）:</p>
      <ul className="list-disc pl-4 py-2 space-y-1">
        <li>
          dbt buildはDAG内のseed・run・snapshot・testノードをまとめて解決し、依存関係に従って実行する統合コマンドです。
        </li>
        <li>
          モデルやスナップショットの実行が失敗すると、その結果を前提とするテストは実行されず、dbt build全体が失敗として扱われます。パイプラインを一括で検証する際に失敗を早期検知できるポイントです。
        </li>
      </ul>
      <hr className="my-2" />
      <p className="font-semibold text-red-500">誤っている記述:</p>
      <ul className="list-disc pl-4 py-2 space-y-1">
        <li>
          dbt runはモデル（およびマクロ経由の派生）に限定され、テスト・スナップショットは実行されません。したがってdbt buildはrunだけでは得られないテストやシードの実行を含みます。
        </li>
        <li>
          dbt seed単体ではテストを実行しません。dbt buildを使うと、シードに依存するテストも同一コマンド内で実行されます。
        </li>
      </ul>
    </div>
  );
}
