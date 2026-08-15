import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "SQL", "Data Quality", "Data Application"],
    created_at: new Date("2026-08-21"),
    updated_at: new Date("2026-08-21"),

    title: "dbt data testsの使い分け",
    question_jsx: <QuizQuestion />,
    options: {
      0: "組み込みのgeneric data testは unique / not_null / accepted_values / relationships の4つで、モデルのYAMLから繰り返し適用する。",
      1: "singular data testは、失敗行を返すSELECTを tests ディレクトリのSQLファイルとして置く。0行ならパスする。",
      2: "severity を warn にすると、失敗してもデフォルトでは error にせず警告として扱える。",
      3: "unit testも singular と同じく tests ディレクトリのSQLファイルとして定義し、dbt test でデータ行の失敗件数を数える。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "dbt Docs - Add data tests to your DAG",
        url: "https://docs.getdbt.com/docs/build/data-tests",
      },
      {
        title: "dbt Docs - severity, error_if, and warn_if",
        url: "https://docs.getdbt.com/reference/resource-configs/severity",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        dbtのdata testsについて、
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
        data testは「欲しくない行をSELECTする」アサーションです。0行ならパス、1行以上なら失敗です。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          unit testは変換ロジックを静的入力で検証するもので、data testとは別物です。
          定義は <code>tests/</code> ではなくモデル配下（<code>model-paths</code>）のYAMLに置きます。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>genericはYAMLで何度も使う型。まずは主キーへ unique と not_null を付けるのが定石です。</li>
        <li>singularは1回きりの業務ルールをSQLで書く型。同じ形が繰り返されたらgeneric化を検討します。</li>
        <li>重要度の低いチェックは severity: warn でパイプラインを止めずに監視できます。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「データの仮定」はdata test、「SQLの変換」はunit test、と対象を分ける。
        主キーと参照整合はgeneric、例外的な業務ルールだけsingular、が迷わない切り方です。
      </p>
    </div>
  );
}
