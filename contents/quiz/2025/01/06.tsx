import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    tags: ["dbt", "Engineering", "Analytics"],
    created_at: new Date("2025-01-06"),
    updated_at: new Date("2025-01-06"),
    // previous_quiz_id: "Q20250104",
    // next_quiz_id: "Q20250106",
    
    // ----- quiz -----
    title: "dbtのインクリメンタルモデルの特徴",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "増分処理により、既存データの再処理が不要で処理時間を短縮できる", 
      1: "実行時に毎回、全データの再処理が必要となる", 
      2: "増分処理時に変換すべき行をdbtに指示するには、レコードをフィルタリングする有効なSQLをis_incremental()マクロに記述する", 
      3: "ターゲットテーブルのレコードを利用してフィルタリングの条件を設定する場合などには{{ target }}変数を利用する", 
      4: "重複を排除してロードするためのunique_keyは必須の設定値である"
    },
    answers: [0, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "dbt Documentation - Incremental Models", url: "https://docs.getdbt.com/docs/build/incremental-models" }
    ],
  });
  return quiz;
}
  
function QuizQuestion() {
  return (
    <div>
      <h1>dbtのインクリメンタルモデルについて、正しい説明を選んでください</h1>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>dbtのインクリメンタルモデルには、以下の特徴があります：</p>
      <ul className="py-2 space-y-2">
        <li>・増分処理により、既存データの再処理が不要で、処理時間を大幅に短縮できます</li>
        <li>・is_incremental()マクロを使用して、増分実行時にどの行を処理するかを制御します</li>
        <li>・「新しい」行、つまり、dbtがこのモデルを最後に実行した時以降に作成された行をフィルタリングしたい場合は、{`{{ this }}`}変数を使用することで、簡単にターゲットテーブルをクエリすることができます。</li>
        <li>・unique_keyの設定は任意であり、既存の行を更新（上書き）する必要がある場合に使用します</li>
        <li>・unique_keyを指定しない場合は、append-onlyの動作となります</li>
        <li>・--full-refreshフラグを使用することで、必要に応じてモデル全体を再構築することができます</li>
      </ul>
      <p>これらの機能により、大規模なデータセットでも効率的な増分処理が可能になります。</p>
    </div>
  );
}

