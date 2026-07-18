import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Integration", "Data Quality", "Operation", "Data Management"],
    created_at: new Date("2026-07-25"),
    updated_at: new Date("2026-07-25"),

    title: "CDC手法を選ぶときの判断軸",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ソースへの書き込み負荷を最小化し、INSERT/UPDATE/DELETEを低遅延で取りたいなら、トランザクションログ（WAL/binlog）ベースが有力候補になる。",
      1: "ソースDBにトリガーを置けない、または置けても書き込みオーバーヘッドが許容できない場合、トリガー方式のログテーブルは避けた方がよい。",
      2: "更新日時カラムによる差分抽出は実装が軽い一方、物理削除の検知には弱く、論理削除や別手段との併用を検討する必要がある。",
      3: "物理削除を確実に反映したい要件でも、ソースへのトリガー設置もログ読取もできないなら、更新日時カラムだけの差分抽出で削除まで自動的に同期できる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Debezium Documentation - Tutorial (CDC pattern)",
        url: "https://debezium.io/documentation/reference/stable/tutorial.html",
      },
      {
        title: "Wikipedia - Change data capture",
        url: "https://en.wikipedia.org/wiki/Change_data_capture",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        CDC（変更データ取り込み）の手法選定について、
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
        CDCは「どの技法が優れているか」より、「制約の中で何を優先するか」で選びます。
        技法そのものの比較は別クイズでも扱っているため、ここでは判断軸に焦点を当てます。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          更新日時差分だけでは、行が物理削除されると痕跡が残らず削除を検知できません。
          トリガーもログ読取も使えないなら、論理削除への変更交渉や、定期的な全件突合が必要になります。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>低負荷・低遅延・削除検知まで求めるならログベースが強い一方、導入・運用は重いです。</li>
        <li>トリガーは確実だがソース書き込みコストが乗るため、禁止・厳格な環境では不向きです。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        先に「削除をどう扱うか」「ソースに手を入れてよいか」「遅延の上限は何か」の3点を決める。
        技法名から入ると、後から物理削除要件で設計が破綻しやすいです。
      </p>
    </div>
  );
}
