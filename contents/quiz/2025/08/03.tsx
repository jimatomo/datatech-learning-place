import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "dbt Fusion", "Static Analysis", "Datatech News"],
    created_at: new Date("2025-08-03"),
    updated_at: new Date("2025-08-03"),

    // ----- quiz -----
    title: "dbt Fusionの新しいコンセプト：静的解析とコンパイル戦略",
    question_jsx: <QuizQuestion />,
    options: {
      0: "dbt Fusionは、イントロスペクティブなクエリを含むモデルに対してもAhead-of-Time (AOT) コンパイルを適用し、Just-in-Time (JIT) コンパイルはサポートしていない。",
      1: "dbt Fusionの静的解析は、Jinjaテンプレートのレンダリング前に実行され、SQLの構文エラーのみを検出する。",
      2: "ユーザー定義関数（UDF）を使用するモデルで静的解析を有効にするには、dbt_project.ymlで`static_analysis: unsafe`と設定する必要がある。",
      3: "イントロスペクティブなクエリ（例: `dbt_utils.get_column_values`）を含むモデルを検出すると、Fusionはそのモデルと下流のモデルに対して自動的にJust-in-Time (JIT) コンパイルに切り替える。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "About the dbt Fusion engine beta | dbt Docs",
        url: "https://docs.getdbt.com/docs/fusion/about-fusion",
      },
      {
        title: "New concepts in dbt Fusion | dbt Docs",
        url: "https://docs.getdbt.com/docs/fusion/new-concepts",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        dbt Labsが発表した新しいエンジン「dbt Fusion」は、静的解析や新しいコンパイル戦略などのコンセプトを導入しました。
        これらの新機能に関する記述として、
        <strong className="text-emerald-500">最も適切なもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-4">
        dbt
        Fusionは、dbt
        CoreのPython製とは異なりRustで記述された、より高速で高機能な新しいdbtエンジンです。最大の特徴の一つが、SQLの静的解析と、それに基づいたインテリジェントなコンパイル戦略です。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            イントロスペクティブなクエリ（例: `dbt_utils.get_column_values`
            ）を含むモデルを検出すると、Fusionはそのモデルと下流のモデルに対して自動的にJust-in-Time
            (JIT) コンパイルに切り替える。：
          </strong>
          <br />
          これは<strong className="text-emerald-500">正しい</strong>
          です。dbt
          FusionはデフォルトでAhead-of-Time
          (AOT)コンパイルを行いますが、実行時のデータに依存するイントロスペクティブなクエリを含むモデルを検出すると、そのモデルと依存する下流のモデルについてのみJust-in-Time
          (JIT)コンパイルに切り替えます。これにより、パフォーマンスと柔軟性を両立させています。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">不正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li className="pt-2">
          <strong>
            dbt Fusionは、イントロスペクティブなクエリを含むモデルに対してもAhead-of-Time
            (AOT) コンパイルを適用し、Just-in-Time (JIT)
            コンパイルはサポートしていない。：
          </strong>
          <br />
          これは<strong className="text-red-500">間違い</strong>
          です。前述の通り、イントロスペクティブなクエリは実行結果に依存するためAOTコンパイルできません。Fusionはこのようなモデルを検知し、JITコンパイルにフォールバックします。
        </li>
        <li className="pt-2">
          <strong>
            dbt Fusionの静的解析は、Jinjaテンプレートのレンダリング前に実行され、SQLの構文エラーのみを検出する。：
          </strong>
          <br />
          これは<strong className="text-red-500">間違い</strong>
          です。dbt Fusionにおけるコンパイルは、まずJinjaをレンダリング（`render`
          ）し、その結果生成されたSQLを静的に解析（`analyze`
          ）する2段階のプロセスです。したがって、解析はJinjaレンダリング後に行われます。
        </li>
        <li className="pt-2">
          <strong>
            ユーザー定義関数（UDF）を使用するモデルで静的解析を有効にするには、dbt_project.ymlで`static_analysis:
            unsafe`と設定する必要がある。：
          </strong>
          <br />
          これは<strong className="text-red-500">間違い</strong>
          です。現在、dbt
          FusionはUDFを解析できないため、UDFを含むモデルでは
          `static_analysis: off`
          を設定して静的解析を無効にする必要があります。`unsafe`は動的テンプレートを持つモデルで静的解析を試みるための設定です。
        </li>
      </ul>
    </div>
  );
}