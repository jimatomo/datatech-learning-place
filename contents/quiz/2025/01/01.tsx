import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Basic"],
    created_at: new Date("2025-01-01"),
    updated_at: new Date("2025-01-01"),


    // ----- quiz -----
    title: "Snowflakeのアーキテクチャ",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "データベースストレージレイヤー", 
      1: "ネットワークレイヤー", 
      2: "クエリ処理レイヤー", 
      3: "セキュリティレイヤー", 
      4: "クラウドサービスレイヤー"
    },
    answers: [0, 2, 4],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "重要な概念およびアーキテクチャ", url: "https://docs.snowflake.com/ja/user-guide/intro-key-concepts" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>Snowflakeのユニークなアーキテクチャを構成する3つの重要なレイヤーはどれですか？</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>Snowflakeのアーキテクチャは、以下の3つの重要なレイヤーで構成されています：</p>
      <ul className="py-2 space-y-2">
        <li>・<strong>データベースストレージレイヤー</strong>：データを内部の最適化された圧縮された列指向形式で保存します</li>
        <li>・<strong>クエリ処理レイヤー</strong>：仮想ウェアハウスを使用してクエリを実行する MPP コンピュートクラスタです</li>
        <li>・<strong>クラウドサービスレイヤー</strong>：認証、インフラストラクチャ管理、メタデータ管理、クエリの解析および最適化、アクセス制御などのサービスを管理します</li>
      </ul>
      <p>このユニークな3層アーキテクチャにより、共有ディスクアーキテクチャのデータ管理の簡易性と、シェアードナッシングアーキテクチャのパフォーマンスとスケールアウトのメリットを両立しています。</p>
    </div>
  );
}
