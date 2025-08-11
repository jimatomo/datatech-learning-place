import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Modeling", "Snowflake", "dbt"],
    created_at: new Date("2025-03-26"),
    updated_at: new Date("2025-03-26"),

    // ----- quiz -----
    title: "dbtのSnowflake接続設定：profiles.ymlの設定項目",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "Snowflakeの接続設定では、accountパラメータは必須で、AWSのUS Westリージョンの場合、アカウントIDのみ（例：abc123）を指定すれば十分である（レガシーな形式）",
      1: "Snowflakeの接続設定では、warehouseパラメータは必須で、dbtがモデルをビルドする際に使用するウェアハウスを指定する必要がある",
      2: "Snowflakeの接続設定では、client_session_keep_aliveをtrueに設定すると、4時間以上の長時間クエリ実行時にセッションが維持される",
      3: "Snowflakeの接続設定では、reuse_connectionsをtrueに設定すると、各スレッドごとに認証情報の検証が行われ、実行時間が短縮される",
    },
    answers: [0, 1, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake setup", url: "https://docs.getdbt.com/docs/core/connect-data-platform/snowflake-setup" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div className="space-y-4">
      <p className="pb-4">
        dbtのSnowflake接続設定（profiles.yml）に関する以下の記述のうち、正しいものをすべて選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-3">
        dbtのSnowflake接続設定は、profiles.ymlファイルで管理され、様々な重要なパラメータを設定することができます。
      </p>
      <p className="pb-2">
        <strong>正しい設定項目：</strong>
      </p>
      <ul className="list-disc pl-4 pb-3">
        <li className="pb-2">accountパラメータは必須で、AWSのUS Westリージョンの場合、アカウントIDのみ（例：abc123）を指定すれば十分です。ただし、他のリージョンやクラウドプラットフォーム（GCP、Azure）の場合は、リージョン情報も追加する必要があります。</li>
        <li className="pb-2">warehouseパラメータは必須で、dbtがモデルをビルドする際に使用するウェアハウスを指定する必要があります。これにより、クエリ実行に必要なコンピューティングリソースが確保されます。</li>
        <li className="pb-2">client_session_keep_aliveをtrueに設定すると、デフォルトの4時間を超える長時間クエリ実行時にセッションが維持されます。これは特に長時間実行されるクエリ（4時間以上）がある場合に有用です。</li>
      </ul>
      <p className="pb-2">
        <strong>誤った設定項目：</strong>
      </p>
      <ul className="list-disc pl-4 pb-3">
        <li>reuse_connectionsをtrueに設定すると、実行時間を短縮するためにアイドル接続を再利用します。これは各スレッドごとの認証情報の検証を減らすためであり、逆に認証情報の検証は最小限に抑えられます。</li>
      </ul>
      <p className="pb-2">
        他にもおすすめなのはquery_tagパラメータです。これは、クエリにタグを付けることができ、モニタリングやガバナンスの目的で使用されます。
        モニタリングするときにフィルターができるので一定邪魔なクエリを除外できます。
        より細やかに設定可能なパッケージもあるので適宜利用してみると良いでしょう。
        <a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" href="https://hub.getdbt.com/get-select/dbt_snowflake_query_tags/latest/">dbt_snowflake_query_tags</a>
      </p>
    </div>
  );
} 
