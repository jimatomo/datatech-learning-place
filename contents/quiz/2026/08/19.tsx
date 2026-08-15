import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Architecture", "Data Storage", "Data Management", "Data Modeling"],
    created_at: new Date("2026-08-19"),
    updated_at: new Date("2026-08-19"),

    title: "Factless Fact Tableの使い所",
    question_jsx: <QuizQuestion />,
    options: {
      0: "受注金額と数量を、受注が起きるたびに記録するトランザクションファクトを置きたい。",
      1: "学生が特定の日に特定の授業へ出席した、という出来事だけを記録したい。金額や件数の列はソースにない。",
      2: "月末時点の在庫数量を残し、時点ごとの残高を分析したい。",
      3: "注文番号のように付随属性のない識別子を、別テーブル化せずファクトに残したい。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Kimball Group - Factless Fact Tables",
        url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/factless-fact-table/",
      },
      {
        title: "Kimball Group - Design Tip #133 Factless Fact Tables for Simplification",
        url: "https://www.kimballgroup.com/2011/04/design-tip-133-factless-fact-tables-for-simplification/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        キンボール流のFactless Fact Table（ファクトレスファクトテーブル）が
        <strong className="text-green-600">最も適切な場面</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Factless Fact Tableは、数値メジャーがなくても「複数の次元が同じ時点で出会った」ことを行として残すファクトです。
        出席やプロモーション対象、顧客への連絡など、出来事そのものが分析対象になるときに使います。
      </p>
      <p className="font-semibold text-emerald-600 mt-2">適切な場面（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          出席は「日付・学生・授業・教室」などが揃ったイベントです。
          行を数えれば出席回数になるので、金額列がなくてもファクトとして成立します。
        </li>
      </ul>
      <p className="font-semibold text-red-500">他の場面:</p>
      <ul className="list-disc pl-4 py-2">
        <li>金額と数量がある受注は、通常のトランザクションファクトです。</li>
        <li>月末在庫数量はPeriodic Snapshot Factの使い所です。</li>
        <li>注文番号をファクトに残すのはDegenerate Dimensionです。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「測る数がないからファクトにできない」と思わず、まず粒度を「何と何がいつ出会ったか」で切る。
        カバレッジ用のFactless（対象になり得た組み合わせ）と実績ファクトを引き算すると、「起きなかったこと」も見えます。
      </p>
    </div>
  );
}
