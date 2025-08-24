import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AI", "Data Management", "Infrastructure", "Datatech News"],
    created_at: new Date("2025-08-31"),
    updated_at: new Date("2025-08-31"),

    // ----- quiz -----
    title: "MetaのAIエージェントによるデータアクセス効率化",
    question_jsx: <QuizQuestion />,
    options: {
      0: "データへのアクセスを要求する「データ利用者エージェント」と、アクセスを管理する「データ所有者エージェント」という2種類の協調するエージェントを導入した。",
      1: "ユーザーの活動履歴やプロファイルからビジネス上の意図を推測し、タスクに応じた適切なデータアクセスを許可する仕組みがある。",
      2: "安全性を確保するため、エージェントの判断がルールベースのリスク計算と一致するかを検証するガードレール機能が組み込まれている。",
      3: "システムの完全な自律性を実現するため、人間の監視や介入（Human-in-the-loop）を完全に排除したアーキテクチャを採用している。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title:
          "Creating AI agent solutions for warehouse data access and security",
        url: "https://engineering.fb.com/2025/08/13/data-infrastructure/agentic-solution-for-warehouse-data-access/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Metaのブログ記事で紹介された、データウェアハウスのアクセス管理を効率化するためのAIエージェントシステムに関する説明として、
        <strong className="text-red-600">誤っているもの</strong>
        を一つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">
        間違っている記述（正答）:
      </p>
      <p>
        「システムの完全な自律性を実現するため、人間の監視や介入（Human-in-the-loop）を完全に排除したアーキテクチャを採用している。」は誤りです。記事では、現時点では監督のために人間がループに介在すること（human-in-the-loop
        for
        oversight）を維持していると述べられています。将来的により自律的に動作することを目指しているものの、完全な排除はされていません。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <b>データ利用者エージェントと所有者エージェント:</b>{" "}
          記事では、データアクセスを支援する「data-user agent」とアクセス管理を助ける「data-owner
          agent」という2つのエージェントをモデル化し、協調させるアプローチが説明されています。
        </li>
        <li>
          <b>意図の推測:</b>{" "}
          ユーザーの活動（差分、タスク、ダッシュボードなど）やプロファイルから「意図（intention）」を推測し、コンテキストに応じたアクセス制御を行う点が強調されています。
        </li>
        <li>
          <b>ガードレール機能:</b> AIエージェントが安全な境界内で動作することを保証するため、分析的なルールベースのリスク計算（analytical
          rule-based risk computation）といったガードレールを設けていると記載されています。
        </li>
      </ul>
    </div>
  );
}


