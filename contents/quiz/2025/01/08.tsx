import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Basic"],
    created_at: new Date("2025-01-08"),
    updated_at: new Date("2025-01-08"),


    // ----- quiz -----
    title: "Snowflakeのマイクロパーティション",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "マイクロパーティションは自動的に生成され、ユーザーが管理する必要はない", 
      1: "マイクロパーティションは常に圧縮されて保存される", 
      2: "マイクロパーティションは最大で1GBのデータを含む", 
      3: "マイクロパーティションは手動で作成する必要がある", 
      4: "マイクロパーティションはデータのスキャンを効率化するために使用される"
    },
    answers: [0, 1, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "マイクロパーティションとデータクラスタリング", url: "https://docs.snowflake.com/ja/user-guide/tables-clustering-micropartitions" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <h1>Snowflakeのマイクロパーティションに関する正しい説明を選んでください</h1>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div>
      <p>Snowflakeのマイクロパーティションについて、以下が正しい説明です：</p>
      <ul>
        <li>・マイクロパーティションは自動的に生成され、ユーザーが管理する必要はありません。</li>
        <li>・マイクロパーティションは常に圧縮されて保存され、効率的なストレージを提供します。</li>
        <li>・マイクロパーティションはデータのスキャンを効率化するために使用され、クエリパフォーマンスを向上させます。</li>
      </ul>
      <p>一方で、マイクロパーティションは最大で500MBのデータを含むため、1GBを超えることはありません。また、手動で作成する必要はありません。</p>
    </div>
  );
}
