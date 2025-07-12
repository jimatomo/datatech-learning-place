import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "Snowflake", "Data Engineering", "ETL", "Data Modeling", "Data Transformation"],
    created_at: new Date("2025-07-13"),
    updated_at: new Date("2025-07-13"),

    // ----- quiz -----
    title: "dbt Projects on Snowflake: プロジェクト構造、モデル、テスト、ドキュメント化の理解",
    question_jsx: <QuizQuestion />,
    options: {
      0: "dbtプロジェクトでは、models/ディレクトリにSQLファイルを配置し、各ファイルは1つのテーブルまたはビューを生成する。dbt runコマンドでモデルを実行できる。",
      1: "dbtのテスト機能には、generic tests（unique、not_null、relationships、accepted_values）とsingular tests（カスタムSQL）の2種類があり、dbt testコマンドで実行される。",
      2: "dbt docsコマンドでドキュメントを生成し、モデル間の依存関係、データリネージ、テスト結果を可視化できる。ただし、Snowflakeとの統合では制限がある。",
      3: "dbtプロジェクトのprofiles.ymlでは、Snowflakeの接続情報（account、user、password、warehouse、database、schema）を定義し、target環境（dev、prod）ごとに設定を分けることができる。",
    },
    answers: [0, 1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "dbt Core | dbt Documentation",
        url: "https://docs.getdbt.com/docs/introduction",
      },
      {
        title: "dbt Snowflake adapter | dbt Documentation",
        url: "https://docs.getdbt.com/reference/warehouse-setup/snowflake-setup",
      },
      {
        title: "dbt Testing | dbt Documentation",
        url: "https://docs.getdbt.com/docs/build/tests",
      },
      {
        title: "dbt Documentation | dbt Documentation",
        url: "https://docs.getdbt.com/docs/collaborate/documentation",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        dbt（data build tool）プロジェクトをSnowflakeで使用する際の、
        <strong className="text-emerald-500">正しいもの</strong>を全て選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        dbt（data build tool）は、データ変換をSQLで記述し、データウェアハウス内で実行するためのツールです。
        Snowflakeとの統合により、効率的なデータパイプラインを構築できます。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            dbtプロジェクトでは、models/ディレクトリにSQLファイルを配置し、各ファイルは1つのテーブルまたはビューを生成する。dbt runコマンドでモデルを実行できる。：
          </strong>
          <br />
          これは<strong className="text-emerald-500">正しい</strong>
          です。dbtプロジェクトの基本構造では、models/ディレクトリにSQLファイルを配置します。
          各SQLファイルは1つのモデルを定義し、dbt runコマンドで実行するとテーブルまたはビューが生成されます。
          モデルは依存関係に基づいて順序付けられて実行されます。
        </li>
        <li className="pt-2">
          <strong>
            dbtのテスト機能には、generic tests（unique、not_null、relationships、accepted_values）とsingular tests（カスタムSQL）の2種類があり、dbt testコマンドで実行される。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。dbtには2種類のテストがあります：
          <ul className="list-disc pl-4 mt-1">
            <li><strong>Generic tests</strong>: unique、not_null、relationships、accepted_valuesなど、事前定義されたテスト</li>
            <li><strong>Singular tests</strong>: カスタムSQLで記述する独自のテスト</li>
          </ul>
          dbt testコマンドでテストを実行し、データ品質を検証できます。
        </li>
        <li className="pt-2">
          <strong>
            dbtプロジェクトのprofiles.ymlでは、Snowflakeの接続情報（account、user、password、warehouse、database、schema）を定義し、target環境（dev、prod）ごとに設定を分けることができる。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。profiles.ymlファイルでSnowflakeの接続情報を定義します：
          <code className="block bg-gray-100 p-2 mt-1 rounded text-xs">
            snowflake:<br/>
            &nbsp;&nbsp;targets:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;dev:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: snowflake<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;account: your_account<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user: your_user<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password: your_password<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;warehouse: your_warehouse<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database: your_database<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema: your_schema
          </code>
          環境ごとに異なる設定を使用できます。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">間違った選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            dbt docsコマンドでドキュメントを生成し、モデル間の依存関係、データリネージ、テスト結果を可視化できる。ただし、Snowflakeとの統合では制限がある。：
          </strong>
          <br />
          これは<strong className="text-red-500">間違い</strong>
          です。dbt docsコマンドで生成されるドキュメントは、Snowflakeとの統合でも完全に機能します。
          モデル間の依存関係、データリネージ、テスト結果、カラムレベルのドキュメントなど、
          すべての機能がSnowflakeでも利用可能です。制限はありません。
        </li>
      </ul>

      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400">
        <p className="font-semibold text-blue-800">dbtプロジェクトの主要コンポーネント：</p>
        <ul className="list-disc pl-4 text-blue-700 text-xs">
          <li><strong>models/</strong>: SQLファイルでデータ変換ロジックを定義</li>
          <li><strong>tests/</strong>: データ品質テストを定義</li>
          <li><strong>macros/</strong>: 再利用可能なSQLコードを定義</li>
          <li><strong>seeds/</strong>: CSVファイルなどの静的データを配置</li>
          <li><strong>snapshots/</strong>: SCD（Slowly Changing Dimensions）を実装</li>
          <li><strong>dbt_project.yml</strong>: プロジェクト設定とモデル設定</li>
          <li><strong>profiles.yml</strong>: データベース接続設定</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400">
        <p className="font-semibold text-green-800">Snowflake固有のdbt機能：</p>
        <ul className="list-disc pl-4 text-green-700 text-xs">
          <li><strong>Materializations</strong>: table、view、incremental、ephemeral</li>
          <li><strong>Snowflake-specific features</strong>: 一時テーブル、クローニング、タイムトラベル</li>
          <li><strong>Warehouse management</strong>: 動的なウェアハウスサイズ変更</li>
          <li><strong>Role-based access</strong>: Snowflakeのロールと権限を活用</li>
        </ul>
      </div>
    </div>
  );
}