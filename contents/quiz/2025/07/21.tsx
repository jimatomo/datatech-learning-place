import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Basic"],
    created_at: new Date("2025-07-21"),
    updated_at: new Date("2025-07-21"),

    // ----- quiz -----
    title: "Snowflake CLIとSnowSQLの違い",
    question_jsx: <QuizQuestion />,
    options: {
      0: "SnowSQLは開発者向けワークロードに特化しており、Snowflake CLIはSQL操作のみに限定されている。",
      1: "Snowflake CLIはSQL操作に加え、StreamlitやSnowparkなどの開発者向けワークロードをサポートするが、SnowSQLは主にSQLの実行とデータのロード/アンロードに焦点を当てている。",
      2: "Snowflake CLIとSnowSQLは機能的に全く同じだが、Snowflake CLIはオープンソースであり、SnowSQLはプロプライエタリなツールである。",
      3: "SnowSQLはPython用Snowflake Connectorが必須だが、Snowflake CLIは追加の依存関係なしで動作する。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake CLI - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/developer-guide/snowflake-cli/index",
      },
      {
        title: "SnowSQL (CLI Client) - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/snowsql",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflake CLIとSnowSQLの主な違いについて、最も適切な説明はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflake CLIとSnowSQLは、どちらもSnowflakeを操作するためのコマンドラインツールですが、その目的と機能には大きな違いがあります。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-red-500">
            SnowSQLは開発者向けワークロードに特化しており、Snowflake CLIはSQL操作のみに限定されている。
          </strong>
          ：これは間違いです。実際には逆で、Snowflake
          CLIがStreamlit、Snowpark、Snowflake Native
          Appsといった開発者中心のワークロードを幅広くサポートしています。SnowSQLは主にSQLクエリの実行やデータのロード/アンロードに特化しています。
        </li>
        <li>
          <strong className="text-emerald-500">
            Snowflake CLIはSQL操作に加え、StreamlitやSnowparkなどの開発者向けワークロードをサポートするが、SnowSQLは主にSQLの実行とデータのロード/アンロードに焦点を当てている。
          </strong>
          ：これが正しい説明です。Snowflake
          CLIは、SQL操作だけでなく、アプリケーション開発（Streamlit、Snowparkなど）のライフサイクル全体をサポートする、よりモダンで拡張性の高いツールとして位置づけられています。Snowflake自身も、SnowSQLからSnowflake
          CLIへの移行を推奨しています。
        </li>
        <li>
          <strong className="text-red-500">
            Snowflake CLIとSnowSQLは機能的に全く同じだが、Snowflake
            CLIはオープンソースであり、SnowSQLはプロプライエタリなツールである。
          </strong>
          ：これも間違いです。両者は機能的に異なります。Snowflake
          CLIは開発者向け機能が豊富です。また、Snowflake
          CLIはオープンソースですが、SnowSQLも内部で利用しているPython用Snowflake
          Connectorはオープンソースで提供されています。
        </li>
        <li>
          <strong className="text-red-500">
            SnowSQLはPython用Snowflake
            Connectorが必須だが、Snowflake CLIは追加の依存関係なしで動作する。
          </strong>
          ：これも間違いです。SnowSQLはPython用Snowflake
          Connectorを使用して開発されていますが、インストーラーに必要なソフトウェアがバンドルされているため、ユーザーが別途コネクターをインストールする必要はありません。
        </li>
      </ul>
      <p className="pt-2">
        結論として、Snowflake
        CLIは従来のSQL実行機能に加えて、Snowflake上でのアプリケーション開発を統合的にサポートするための次世代コマンドラインツールです。一方、SnowSQLはSQL中心の操作に特化した従来からのクライアントです。
      </p>
    </div>
  );
}