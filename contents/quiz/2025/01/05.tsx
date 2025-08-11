import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "Infrastructure", "S3"],
    created_at: new Date("2025-01-05"),
    updated_at: new Date("2025-01-05"),


    // ----- quiz -----
    title: "Amazon S3のストレージクラス",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "S3 Standard-IAはアクセス頻度が低いデータ向けで、最小保存期間は30日", 
      1: "S3 Glacierは即時取り出しが可能", 
      2: "S3 One Zone-IAは単一のAZにのみデータを保存する", 
      3: "S3 Standardは最小保存期間の制約がある", 
      4: "S3 Intelligent-Tieringは自動的にデータを最適なストレージクラスに移動する"
    },
    answers: [0, 2, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Amazon S3 ストレージクラス", url: "https://aws.amazon.com/jp/s3/storage-classes/" },
      { title: "S3 Intelligent-Tiering", url: "https://aws.amazon.com/jp/s3/storage-classes/intelligent-tiering/" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>Amazon S3のストレージクラスについて、正しい説明を選んでください</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>S3のストレージクラスについて、以下が正しい説明です：</p>
      <ul className="py-2 space-y-2">
        <li>・<strong>S3 Standard-IA</strong>は低頻度アクセスのデータ向けで、最小保存期間は30日です</li>
        <li>・<strong>S3 One Zone-IA</strong>は単一のAZにデータを保存し、コストを抑えることができます</li>
        <li>・<strong>S3 Intelligent-Tiering</strong>はアクセスパターンに基づいて自動的に最適なストレージクラスにデータを移動します</li>
      </ul>
      <p>一方で、S3 Glacierは即時取り出しができず、取り出しに数分から数時間かかります。また、S3 Standardには最小保存期間の制約はありません。</p>
    </div>
  );
}
