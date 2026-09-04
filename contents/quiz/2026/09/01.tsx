import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Performance", "SQL", "Snowflake Advanced"],
    created_at: new Date("2026-09-01"),
    updated_at: new Date("2026-09-01"),

    title: "Query Acceleration Serviceの使い所",
    question_jsx: <QuizQuestion />,
    options: {
      0: "数十行のディメンションを主キーで引く点が、たまに数秒かかる。全クエリを均等に速くしたい。",
      1: "巨大ファクトを日付で絞る集計が、たまに倉庫全体を長時間占有する。スキャンと選択的フィルタが支配的である。",
      2: "クラスタリングキーの代わりにQASを付け、DMLが多い小さな表の並びも自動で直したい。",
      3: "SEQなど非決定的な関数を含むクエリを、スケールファクタを上げて必ず加速したい。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Documentation - Using the Query Acceleration Service",
        url: "https://docs.snowflake.com/en/user-guide/query-acceleration-service",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowflakeのQuery Acceleration Service（QAS）が
        <strong className="text-green-600">最も効果を見込みやすい場面</strong>
        を1つ選択してください。Enterprise Edition以上を前提とします。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        QASはウェアハウスの外れ値クエリのうち、並列化できる大きなスキャン／フィルタ（および大きなINSERT/COPY）を共有コンピュートへ退避します。
        全クエリの底上げ装置ではありません。
      </p>
      <p className="font-semibold text-emerald-600 mt-2">適切な場面（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          巨大スキャンに選択的フィルタが乗るパターンは、公式が挙げる適格ワークロードそのものです。
          倉庫を占有する外れ値を短くするのが主目的です。
        </li>
      </ul>
      <p className="font-semibold text-red-500">他の場面:</p>
      <ul className="list-disc pl-4 py-2">
        <li>小さな点引きはスキャンが足りず、適格にならないことが多いです。</li>
        <li>クラスタリングの代替ではありません。小さな表の並びにQASは使いません。</li>
        <li>非決定的関数を含むクエリは加速対象外になり得ます。スケールファクタでは解けません。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        付ける前に <code>QUERY_ACCELERATION_ELIGIBLE</code> か <code>SYSTEM$ESTIMATE_QUERY_ACCELERATION</code> で適格か見る。
        クレジット増を抑えるなら <code>QUERY_ACCELERATION_MAX_SCALE_FACTOR</code> を先に決める。
      </p>
    </div>
  );
}
