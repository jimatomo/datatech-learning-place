import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Codex",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Data Integration", "Performance", "Snowflake Advanced"],
    created_at: new Date("2026-07-14"),
    updated_at: new Date("2026-07-14"),

    title: "Dynamic TablesのTARGET_LAGとREFRESH_MODE",
    question_jsx: <QuizQuestion />,
    options: {
      0: "TARGET_LAG = '10 minutes'は10分ごとの固定的なrefresh intervalではなく、base tableに対するtarget lagを10分以内に保つための設定である。",
      1: "TARGET_LAGはbest-effort targetであり、warehouse size、データ量、クエリの複雑さなどによってactual lagがTARGET_LAGを超える場合がある。",
      2: "TARGET_LAG = DOWNSTREAMのDynamic Tableには独立したrefresh scheduleがなく、downstream consumerが存在しなければ自動refreshされない。",
      3: "REFRESH_MODE = AUTOはrefreshのたびにINCREMENTALとFULLを切り替え、常にその時点で安価なmodeを自動選択する。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Documentation - Set the target lag for a dynamic table",
        url: "https://docs.snowflake.com/en/user-guide/dynamic-tables-target-lag",
      },
      {
        title: "Snowflake Documentation - Dynamic table refresh modes",
        url: "https://docs.snowflake.com/en/user-guide/dynamic-tables/refresh-modes",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflake Dynamic Tablesの<code>TARGET_LAG</code>と<code>REFRESH_MODE</code>について、
        <strong className="text-red-600">誤っているもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <code>REFRESH_MODE = AUTO</code>は作成時にDynamic Tableの定義を評価し、<code>INCREMENTAL</code>または<code>FULL</code>へ一度解決されます。
          refreshのたびに両modeを切り替える設定ではありません。upstream changeの量に応じてincremental refreshとreinitializationを使い分けるのは<code>ADAPTIVE</code>です。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li><code>TARGET_LAG</code>は固定的なrefresh intervalではなく、rootのbase tableに対するtarget lagです。</li>
        <li><code>TARGET_LAG</code>は保証値ではないため、actual lagをmonitoringする必要があります。</li>
        <li><code>DOWNSTREAM</code>はdownstream Dynamic Tableの要求に合わせてrefreshを連携させる設定です。</li>
      </ul>
    </div>
  );
}
