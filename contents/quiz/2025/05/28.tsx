import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Modeling", "dbt"],
    created_at: new Date("2025-05-28"),
    updated_at: new Date("2025-05-28"),

    // ----- quiz -----
    title: "dbt sourceコマンドの機能について",
    question_jsx: <QuizQuestion />,
    options: {
      0: "dbt source freshnessコマンドは、データベースに接続せずにローカルファイルのみを読み取って動作する。",
      1: "dbt source freshnessコマンドは、--selectフラグを使用して特定のソースを選択することはできない。",
      2: "dbt source freshnessコマンドは、--outputオプションを使用して、フレッシュネス情報をJSON形式で出力することができる。",
      3: "dbt source freshnessコマンドは、設定されたfreshnessの基準に関係なく、常に全てのソースをpassとして報告する。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "About dbt source command | dbt Docs", url: "https://docs.getdbt.com/reference/commands/source" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        dbt の source コマンドに関する説明のうち、<strong>正しいもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        dbt の source コマンドは、ソースデータの「フレッシュネス」を監視するためのコマンドです。
        主なサブコマンドとして dbt source freshness があり、定義されたソーステーブルのフレッシュネスを確認し、
        設定に基づいて警告やエラーを報告します。
      </p>

      <p className="py-2 font-semibold text-red-500">誤った選択肢：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>dbt source freshnessコマンドは、データベースに接続せずにローカルファイルのみを読み取って動作する。:</strong>
          <br />
          これは誤りです。dbt source freshness コマンドは、実際にデータベースに接続してソーステーブルにクエリを実行し、
          データの最新性を確認します。ローカルファイルの読み取りだけでは動作しません。
        </li>
        <li>
          <strong>dbt source freshnessコマンドは、--selectフラグを使用して特定のソースを選択することはできない。:</strong>
          <br />
          これも誤りです。dbt source freshness コマンドは --select フラグを使用して特定のソースを選択することができます。
          例えば dbt source freshness --select &quot;source:snowplow&quot; のように使用できます。
        </li>
        <li>
          <strong>dbt source freshnessコマンドは、設定されたfreshnessの基準に関係なく、常に全てのソースをpassとして報告する。:</strong>
          <br />
          これも誤りです。dbt source freshness コマンドは、各ソースに設定された warn_after や error_after の基準に基づいて、
          ソースの状態を&quot;pass&quot;、&quot;warn&quot;、&quot;error&quot;として適切に報告します。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-emerald-500">dbt source freshnessコマンドは、--outputオプションを使用して、フレッシュネス情報をJSON形式で出力することができる。:</strong>
          <br />
          これは正しい説明です。dbt source freshness コマンドは --output（または -o）オプションを使用して、
          フレッシュネス情報をJSON形式で指定したパスに出力することができます。
          デフォルトでは target/sources.json に保存されますが、
          dbt source freshness --output target/source_freshness.json のように出力先を変更できます。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
      </p>
      <p className="pt-2">
        dbt の source freshness コマンドは、データパイプラインの健全性を監視するための重要なツールです。
        データベースに接続してソースデータの最新性を確認し、設定された基準に基づいて警告やエラーを報告します。
        --select フラグで特定のソースを選択したり、--output オプションでJSON形式の結果を出力したりすることができます。
        このコマンドを定期的に実行することで、データソースのSLA違反を検知し、データの品質を維持することができます。
      </p>
    </div>
  );
} 
