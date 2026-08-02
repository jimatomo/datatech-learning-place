import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Performance", "Operation", "Snowflake Basic"],
    created_at: new Date("2026-08-03"),
    updated_at: new Date("2026-08-03"),

    title: "ウェアハウスの自動停止・再開の基本",
    question_jsx: <QuizQuestion />,
    options: {
      0: "AUTO_SUSPENDは、ウェアハウスが非アクティブになってから自動停止するまでの秒数を指定する。既定値は600（10分）である。",
      1: "AUTO_RESUMEがTRUEのとき、そのウェアハウスにSQLが投入されると、停止中でも自動的に再開される。",
      2: "AUTO_SUSPENDを0またはNULLにすると自動停止が無効になり、常時起動のままクレジットを消費し続ける可能性がある。",
      3: "マルチクラスターウェアハウスでは、AUTO_SUSPENDとAUTO_RESUMEは個々のクラスター単位に独立して適用され、倉庫全体の状態とは無関係である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake - Overview of warehouses（Auto-suspension and auto-resumption）",
        url: "https://docs.snowflake.com/en/user-guide/warehouses-overview",
      },
      {
        title: "Snowflake - CREATE WAREHOUSE",
        url: "https://docs.snowflake.com/en/sql-reference/sql/create-warehouse",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeの仮想ウェアハウスにおけるAUTO_SUSPEND / AUTO_RESUMEについて、
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
        自動停止・再開は、クエリがない時間のクレジット消費を抑えつつ、必要なときに計算資源を立ち上げ直すための基本設定です。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          AUTO_SUSPEND / AUTO_RESUMEは個々のクラスターではなく、ウェアハウス全体に適用されます。
          マルチクラスターでは、最小クラスター数が稼働中で一定時間アイドルのときに初めて自動停止し、
          自動再開は倉庫全体が停止している場合にのみ働きます。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>AUTO_SUSPENDは非アクティブ後の停止までの秒数で、既定は600秒です。</li>
        <li>AUTO_RESUMEの既定はTRUEで、対象ウェアハウスへのSQL投入で再開されます。</li>
        <li>0やNULLは常時稼働に近く、特に大きい倉庫ではコスト増の要因になります。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        停止を短くしすぎるとキャッシュが消えやすく、長すぎるとアイドル課金が増えます。
        クエリ間隔とキャッシュの価値を見て、タスク系は短め・BI系は長め、という具合に用途別に合わせるのが実務的です。
      </p>
    </div>
  );
}
