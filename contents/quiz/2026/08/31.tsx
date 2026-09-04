import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Performance", "Data Storage", "Snowflake Basic"],
    created_at: new Date("2026-08-31"),
    updated_at: new Date("2026-08-31"),

    title: "クラスタリングキーを付ける判断軸",
    question_jsx: <QuizQuestion />,
    options: {
      0: "対象はマイクロパーティションが多い大規模テーブル（目安は複数TB）で、選択的フィルタやソートが多い場合に効く。",
      1: "キーは3〜4列までに抑え、選択的フィルタでよく使う列を優先する。極端にカーディナリティが高い列はそのまま使わず式で落とす。",
      2: "自動リクラスタはクレジットと追加ストレージを使う。クエリ頻度が高くDMLが少ないテーブルほど費用対効果が出やすい。",
      3: "ハイブリッドテーブルにもクラスタリングキーを定義でき、主キーとは独立にマイクロパーティションを並び替えられる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Documentation - Clustering Keys & Clustered Tables",
        url: "https://docs.snowflake.com/en/user-guide/tables-clustering-keys",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeのクラスタリングキーについて、
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
        クラスタリングキーは、巨大テーブルのマイクロパーティションを特定列で寄せ、スキャンのスキップを効かせる仕組みです。全テーブルの既定設定ではありません。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          ハイブリッドテーブルは主キー順で保持され、クラスタリングキーは定義できません。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>小さい表やフルスキャン中心なら、メンテ費用の方が先に立ちます。</li>
        <li>日付のようなフィルタ列を先に置き、ナノ秒TIMESTAMPは <code>TO_DATE</code> などでカーディナリティを下げます。</li>
        <li>リクラスタは自動ですが無料ではなく、更新が多い表ほど高くなります。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        付ける前に「同じWHERE（またはJOIN）が大半か」を見る。
        クエリパターンがばらけるならキーを増やさず、まずウェアハウスとプルーニング可能なフィルタを整える。
      </p>
    </div>
  );
}
