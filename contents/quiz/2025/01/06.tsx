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
    title: "dbtのincrementalモデル",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "インクリメンタルモデルは、全データを再処理する必要がない", 
      1: "インクリメンタルモデルは、毎回全てのデータを再ロードする", 
      2: "インクリメンタルモデルは、特定の条件に基づいて新しいデータのみを処理する", 
      3: "インクリメンタルモデルは、データの整合性を保証しない", 
      4: "インクリメンタルモデルは、データの更新を自動的に行う"
    },
    answers: [0, 2, 4],
    explanation: "dbtのインクリメンタルモデルについて、以下が正しい説明です：\n\n- インクリメンタルモデルは、全データを再処理する必要がなく、新しいデータのみを処理します。\n- インクリメンタルモデルは、特定の条件に基づいて新しいデータを追加し、データの更新を自動的に行います。",
    references: [
      { title: "dbt Documentation - Incremental Models", url: "https://docs.getdbt.com/docs/building-a-dbt-project/building-models/incremental-models" }
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
