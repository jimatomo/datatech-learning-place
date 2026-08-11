import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Performance", "SQL", "Snowflake Advanced"],
    created_at: new Date("2026-08-11"),
    updated_at: new Date("2026-08-11"),

    title: "Search Optimization Serviceの使い所",
    question_jsx: <QuizQuestion />,
    options: {
      0: "選択性の高いポイントルックアップ（等価やINで少数行を返すクエリ）や、対応する部分文字列・半構造化データの絞り込みに効きやすい。",
      1: "search access pathという永続構造をバックグラウンドで構築・更新し、マイクロパーティションのスキップを助ける。Enterprise Edition以上が必要。",
      2: "External TableやHybrid Table、Temporary Tableには現状サポートがなく、FLOAT列への適用も対象外である。",
      3: "テーブル列にCASTをかけた述語でも常に加速され、Time Travelで過去時点を参照するクエリにもsearch access pathが効く。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Documentation - Search optimization service",
        url: "https://docs.snowflake.com/en/user-guide/search-optimization-service",
      },
      {
        title: "Snowflake Documentation - Identifying queries that can benefit from search optimization",
        url: "https://docs.snowflake.com/en/user-guide/search-optimization/queries-that-benefit",
      },
      {
        title: "Snowflake Documentation - Queries that do not benefit (Time Travel limitation)",
        url: "https://docs.snowflake.com/en/user-guide/search-optimization/queries-that-benefit#label-search-optimization-limitations",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowflakeのSearch Optimization Serviceについて、
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
        Search Optimizationは、選択的な絞り込みクエリのスキャン量を減らすためのサービスです。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          テーブル列側へのCAST（例外は数値→VARCHARなど一部）は対象外です。
          またSearch Optimizationはアクティブデータ向けで、Time Travelクエリは加速しません。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>ポイントルックアップや対応する述語タイプで効果が出やすいです。</li>
        <li>search access pathの構築は非同期で、完了前は加速されません。</li>
        <li>External / Hybrid / Temporary などは非対応。FLOATも対象外です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「大きいテーブルを速くしたい」ではなく、「高カーディナリティ列への選択的フィルタが遅い」ときに候補にする。
        フルスキャン寄りの集計にはクラスタリングや別手法を先に検討します。
      </p>
    </div>
  );
}
