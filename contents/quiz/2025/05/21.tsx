import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "list", "Data Modeling"],
    created_at: new Date("2025-05-21"),
    updated_at: new Date("2025-05-21"),

    // ----- quiz -----
    title: "dbt lsコマンドの機能について",
    question_jsx: <QuizQuestion />,
    options: {
      0: "dbt lsコマンドは、データベースに接続して実際のクエリを実行し、モデルの状態を確認するために使用される。",
      1: "dbt lsコマンドは、--selectフラグを使用して特定のモデルを選択することはできない。",
      2: "dbt lsコマンドは、--output jsonオプションを使用して、モデルの詳細情報をJSON形式で出力することができる。",
      3: "dbt lsコマンドは、無効化されたモデル（config.enabled=false）も含めて全てのモデルを表示する。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "About dbt ls (list) command | dbt Docs", url: "https://docs.getdbt.com/reference/commands/list" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        dbt の <code>ls</code> コマンドに関する説明のうち、<strong>正しいもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        dbt の <code>ls</code> コマンドは、プロジェクト内のリソース（モデル、ソース、シード、スナップショットなど）を一覧表示するためのコマンドです。
        このコマンドはデータベースに接続せず、プロジェクトの設定ファイルを読み取るだけで動作します。
      </p>

      <p className="py-2 font-semibold text-red-500">誤った選択肢：</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>dbt lsコマンドは、データベースに接続して実際のクエリを実行し、モデルの状態を確認するために使用される。:</strong>
          <br />
          これは誤りです。<code>dbt ls</code> コマンドはデータベースに接続せず、プロジェクトの設定ファイルを読み取るだけで動作します。
          実際のクエリ実行やモデルの状態確認は行いません。
        </li>
        <li>
          <strong>dbt lsコマンドは、--selectフラグを使用して特定のモデルを選択することはできない。:</strong>
          <br />
          これも誤りです。<code>dbt ls</code> コマンドは <code>--select</code> フラグを使用して特定のモデルを選択することができます。
          例えば <code>dbt ls --select &quot;tag:nightly&quot;</code> のように使用できます。
        </li>
        <li>
          <strong>dbt lsコマンドは、無効化されたモデル（config.enabled=false）も含めて全てのモデルを表示する。:</strong>
          <br />
          これも誤りです。<code>dbt ls</code> コマンドは、無効化されたモデル（<code>config.enabled=false</code>）を表示しません。
          表示されるのは有効なモデルのみです。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-emerald-500">dbt lsコマンドは、--output jsonオプションを使用して、モデルの詳細情報をJSON形式で出力することができる。:</strong>
          <br />
          これは正しい説明です。<code>dbt ls</code> コマンドは <code>--output json</code> オプションを使用して、モデルの詳細情報をJSON形式で出力することができます。
          さらに <code>--output-keys</code> オプションを使用して、出力するプロパティを指定することも可能です。
          例えば <code>dbt ls --select &quot;snowplow.*&quot; --output json --output-keys &quot;name resource_type description&quot;</code> のように使用できます。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
      </p>
      <p className="pt-2">
        dbt の <code>ls</code> コマンドは、プロジェクト内のリソースを一覧表示するための便利なツールです。
        データベースに接続せずに動作し、<code>--select</code> フラグで特定のモデルを選択したり、<code>--output json</code> オプションでJSON形式で出力したりすることができます。
        また、無効化されたモデルは表示されないという特徴があります。
        このコマンドは、プロジェクトの構造を確認したり、特定のモデルを選択したりする--selectシンタックスのテストなどの際に非常に有用です。
        --selectシンタックスで利用可能なstate:modifiedで必要なmanifest.jsonを取得する際などで利用できます。
      </p>
    </div>
  );
} 
