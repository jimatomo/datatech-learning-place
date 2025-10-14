import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "SQL", "Performance", "Snowflake Basic"],
    created_at: new Date("2025-10-13"),
    updated_at: new Date("2025-10-13"),

    // ----- quiz -----
    title: "SAMPLE/TABLESAMPLE 構文の理解",
    question_jsx: <QuizQuestion />,
    options: {
      0: "SAMPLE で方式を省略した場合は BERNOULLI が適用され、行ごとに独立に確率抽出される。",
      1: "SAMPLE SYSTEM(10) はブロック単位（SYSTEM/BLOCK）の近似サンプリングで、返る行数はあくまでおおよそ 10% になる。",
      2: "SAMPLE は指定した割合と常に完全一致する行数を返すため、件数制御の精度は LIMIT より高い。",
      3: "TABLESAMPLE は SAMPLE の別名で、どちらを使っても同じ意味になる。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "SAMPLE / TABLESAMPLE | Snowflake ドキュメント",
        url: "https://docs.snowflake.com/ja/sql-reference/constructs/sample",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflake の <code>SAMPLE</code>/<code>TABLESAMPLE</code> 構文に関する説明として、
        <strong className="text-red-600">誤っているもの</strong>を 1 つ選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">Incorrect statement (answer):</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          SAMPLE は<strong>常に</strong>指定割合と完全一致する行数を返しません。統計的にランダムに抽出されるため、実行ごと・方式ごとに行数はぶれます。厳密な件数制御には <code>LIMIT</code> を使いますが、<code>LIMIT</code> は順序に依存するため、ランダム抽出目的なら <code>SAMPLE</code> が適切です。
        </li>
      </ul>
      <p className="font-semibold text-green-600">Correct statements:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          方式を省略すると既定で <strong>BERNOULLI</strong> が使われ、各行が独立に抽出対象となります。
        </li>
        <li>
          <strong>SYSTEM（別名 BLOCK）</strong> は<strong>ブロック単位</strong>の近似サンプリングで、大規模テーブルで高速な一方、返却件数は目安になります。
        </li>
        <li>
          <code>TABLESAMPLE</code> は <code>SAMPLE</code> の別名で、同一の構文・動作です。
        </li>
      </ul>
    </div>
  );
}
