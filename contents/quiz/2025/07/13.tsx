import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Modeling", "DataTech News", "Snowflake", "dbt"],
    created_at: new Date("2025-07-13"),
    updated_at: new Date("2025-07-13"),

    // ----- quiz -----
    title: "dbt Projects on Snowflake: Snowflakeネイティブのdbt統合機能の理解",
    question_jsx: <QuizQuestion />,
    options: {
      0: "dbt Projects on Snowflakeでは、Workspaces in Snowsightを使用してdbtプロジェクトをWebベースのIDEで編集・実行でき、Gitリポジトリとの接続も可能である。",
      1: "dbt project objectはスキーマレベルのオブジェクトで、CREATE、ALTER、DROPコマンドで管理でき、ロールベースのアクセス制御（RBAC）をサポートしている。",
      2: "dbt Projects on Snowflakeでは、dbt Cloudプロジェクトも完全にサポートされており、dbt Cloudのすべての機能を利用できる。",
      3: "Workspacesは他のユーザーと共有でき、チーム全体で同じdbtプロジェクトを同時に編集できる。",
    },
    answers: [2, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "dbt Projects on Snowflake | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/data-engineering/dbt-projects-on-snowflake",
      },
      {
        title: "CREATE DBT PROJECT | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/sql-reference/sql/create-dbt-project",
      },
      {
        title: "EXECUTE DBT PROJECT | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/sql-reference/sql/execute-dbt-project",
      },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        dbt Projects on Snowflakeについて、
        <strong className="text-red-500">間違ったもの</strong>を全て選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        dbt Projects on Snowflakeは、Snowflakeネイティブのdbt統合機能です。
        SnowsightのWorkspacesを使用してdbtプロジェクトを管理し、
        Snowflake内でdbtコマンドを実行できる機能を提供します。
      </p>

      <p className="py-2 font-semibold text-red-500">間違った選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-red-500">
            dbt Projects on Snowflakeでは、dbt Cloudプロジェクトも完全にサポートされており、dbt Cloudのすべての機能を利用できる。：
          </strong>
          <br />
          これは<strong className="text-red-500">間違い</strong>
          です。dbt Projects on Snowflakeはdbt Coreプロジェクトのみをサポートし、
          dbt Cloudプロジェクトはサポートされていません。公式ドキュメントでも明確に記載されています。
        </li>
        <li className="pt-2">
          <strong className="text-red-500">
            Workspacesは他のユーザーと共有でき、チーム全体で同じdbtプロジェクトを同時に編集できる。：
          </strong>
          <br />
          これも<strong className="text-red-500">間違い</strong>
          です。Workspacesは個人データベース内に作成され、他のユーザーと共有することはできません。
          各ユーザーが独自のWorkspaceを持つ必要があります。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>
            dbt Projects on Snowflakeでは、Workspaces in Snowsightを使用してdbtプロジェクトをWebベースのIDEで編集・実行でき、Gitリポジトリとの接続も可能である。：
          </strong>
          <br />
          これは<strong className="text-emerald-500">正しい</strong>
          です。SnowsightのWorkspacesは、dbtプロジェクト用のWebベースの統合開発環境（IDE）を提供します。
          Gitリポジトリとの接続が可能で、プロジェクトの可視化、テスト、実行をSnowflake内で直接行えます。
        </li>
        <li className="pt-2">
          <strong>
            dbt project objectはスキーマレベルのオブジェクトで、CREATE、ALTER、DROPコマンドで管理でき、ロールベースのアクセス制御（RBAC）をサポートしている。：
          </strong>
          <br />
          これも<strong className="text-emerald-500">正しい</strong>
          です。dbt project objectは他のスキーマレベルオブジェクトと同様に、
          CREATE、ALTER、DROPコマンドで管理でき、Snowflakeのロールベースアクセス制御（RBAC）を活用できます。
        </li>
      </ul>

      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400">
        <p className="font-semibold text-blue-800">dbt Projects on Snowflakeの主要機能：</p>
        <ul className="list-disc pl-4 text-blue-700 text-xs">
          <li><strong>Workspaces</strong>: Snowsight内のWebベースIDEでdbtプロジェクトを編集・実行</li>
          <li><strong>dbt project objects</strong>: スキーマレベルオブジェクトとしてdbtプロジェクトを管理</li>
          <li><strong>Versioning</strong>: プロジェクトファイルのバージョン管理機能</li>
          <li><strong>CI/CD integration</strong>: Snowflake CLIを使用したCI/CDパイプライン統合</li>
          <li><strong>Task scheduling</strong>: タスクを使用したdbtプロジェクト実行のスケジューリング</li>
          <li><strong>Monitoring</strong>: Snowflakeの監視ツールによるdbtプロジェクト実行の監視</li>
        </ul>
      </div>
    </div>
  );
}