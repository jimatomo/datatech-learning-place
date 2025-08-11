import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Basic"],
    created_at: new Date("2025-08-04"),
    updated_at: new Date("2025-08-04"),

    // ----- quiz -----
    title: "Snowflakeのレプリケーション関連ビューの役割",
    question_jsx: <QuizQuestion />,
    options: {
      0: "DATABASE_REPLICATION_USAGE_HISTORYは個別のデータベースの複製コスト、REPLICATION_GROUP_REFRESH_HISTORYは複製グループの更新プロセスの詳細、REPLICATION_GROUP_USAGE_HISTORYは複製グループ全体のコストを追跡する。",
      1: "DATABASE_REPLICATION_USAGE_HISTORYは複製グループの更新プロセスを追跡し、REPLICATION_GROUP_REFRESH_HISTORYは個別のデータベースの複製コストを追跡する。",
      2: "REPLICATION_GROUP_USAGE_HISTORYはリアルタイムの複製レイテンシを監視し、DATABASE_REPLICATION_USAGE_HISTORYはオブジェクトのメタデータ変更のみを記録する。",
      3: "DATABASE_REPLICATION_USAGE_HISTORY、REPLICATION_GROUP_REFRESH_HISTORY、およびREPLICATION_GROUP_USAGE_HISTORYの3つのビューは、ほぼ同じ情報を含んでおり、主に異なるタイムゾーンでデータを表示するために使い分ける。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "DATABASE_REPLICATION_USAGE_HISTORY View - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/sql-reference/account-usage/database_replication_usage_history",
      },
      {
        title: "REPLICATION_GROUP_REFRESH_HISTORY View - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/sql-reference/account-usage/replication_group_refresh_history",
      },
      {
        title: "REPLICATION_GROUP_USAGE_HISTORY View - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/sql-reference/account-usage/replication_group_usage_history",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeの ACCOUNT_USAGE スキーマに含まれるレプリケーション関連のビューについて、それぞれの役割を正しく説明しているものはどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        SnowflakeのACCOUNT_USAGEスキーマには、レプリケーションの監視とコスト管理に役立つ複数のビューが用意されています。それぞれのビューは異なる側面に焦点を当てています。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-emerald-500">
            DATABASE_REPLICATION_USAGE_HISTORYは個別のデータベースの複製コスト、REPLICATION_GROUP_REFRESH_HISTORYは複製グループの更新プロセスの詳細、REPLICATION_GROUP_USAGE_HISTORYは複製グループ全体のコストを追跡する。
          </strong>
          ：これは正しい説明です。
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>DATABASE_REPLICATION_USAGE_HISTORY</strong>
              : 個々のデータベースのレプリケーションに関して消費されたクレジットと転送されたバイト数を追跡します。データベース単位でのコスト分析に有用です。
            </li>
            <li>
              <strong>REPLICATION_GROUP_REFRESH_HISTORY</strong>
              : レプリケーショングループまたはフェイルオーバーグループの更新処理の履歴を提供します。これには、更新の各フェーズの開始・終了時刻、転送バイト数、オブジェクト数が含まれ、パフォーマンスのボトルネックやエラーの特定に役立ちます。
            </li>
            <li>
              <strong>REPLICATION_GROUP_USAGE_HISTORY</strong>
              : レプリケーショングループ全体で消費されたクレジットを追跡します。グループ単位でのコスト管理に使用されます。
            </li>
          </ul>
        </li>
        <li>
          <strong className="text-red-500">
            DATABASE_REPLICATION_USAGE_HISTORYは複製グループの更新プロセスを追跡し、REPLICATION_GROUP_REFRESH_HISTORYは個別のデータベースの複製コストを追跡する。
          </strong>
          ：これは間違いです。ビューの役割が逆になっています。DATABASE_REPLICATION_USAGE_HISTORYはデータベース単位のコスト、REPLICATION_GROUP_REFRESH_HISTORYはグループの更新プロセスの詳細を追跡します。
        </li>
        <li>
          <strong className="text-red-500">
            REPLICATION_GROUP_USAGE_HISTORYはリアルタイムの複製レイテンシを監視し、DATABASE_REPLICATION_USAGE_HISTORYはオブジェクトのメタデータ変更のみを記録する。
          </strong>
          ：これも間違いです。レイテンシ監視はこれらのビューの主目的ではありません。またDATABASE_REPLICATION_USAGE_HISTORYはコスト（クレジットとバイト数）を記録するもので、メタデータ変更のみに限定されません。
        </li>
        <li>
          <strong className="text-red-500">
            DATABASE_REPLICATION_USAGE_HISTORY、REPLICATION_GROUP_REFRESH_HISTORY、およびREPLICATION_GROUP_USAGE_HISTORYの3つのビューは、ほぼ同じ情報を含んでおり、主に異なるタイムゾーンでデータを表示するために使い分ける。
          </strong>
          ：これも間違いです。前述の通り、これら3つのビューはそれぞれ異なる目的と情報（データベース単位のコスト、グループの更新詳細、グループ単位のコスト）を提供しており、情報の重複はほとんどありません。
        </li>
      </ul>
      <p className="pt-2">
        適切なビューを使い分けることで、Snowflakeのレプリケーションに関するコスト管理とパフォーマンス監視を効率的に行うことができます。
      </p>
    </div>
  );
}