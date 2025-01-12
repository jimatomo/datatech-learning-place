import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Edition", "Features"],
    created_at: new Date("2025-01-03"),
    updated_at: new Date("2025-01-03"),

    // ----- quiz -----
    title: "SnowflakeのStandard EditionとEnterprise Editionの機能差",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "マルチクラスター仮想ウェアハウス機能", 
      1: "標準的なTime Travel（最大1日）", 
      2: "暗号化されたデータの定期的なキー更新 による保護の強化", 
      3: "半構造化データ （JSON、Avro、 ORC、Parquet、および XML）のネイティブサポート", 
      4: "Snowpipeによる継続的なマイクロバッチロード"
    },
    answers: [0, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake Edition", url: "https://docs.snowflake.com/ja/user-guide/intro-editions" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>以下の機能のうち、Enterprise Editionで利用可能だが、Standard Editionでは利用できない機能はどれですか？</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>Standard EditionとEnterprise Editionの主な機能差は以下の通りです：</p>
      <ul className="py-2 space-y-2">
        <li>・<strong>Enterprise Editionのみで利用可能な機能：</strong>
          <br />- マルチクラスター仮想ウェアハウス（並行性のニーズに対応）
          <br />- 暗号化されたデータの定期的なキー更新 による保護の強化</li>
        <li>・<strong>両エディションで利用可能な機能：</strong>
          <br />- 標準的なTime Travel（最大1日）
          <br />- 半構造化データ （JSON、Avro、 ORC、Parquet、および XML）のネイティブサポート
          <br />- Snowpipeによる継続的なマイクロバッチロード</li>
      </ul>
      <p>Enterprise Editionは、Standard Editionのすべての機能に加えて、大規模な企業や組織のニーズに合わせて設計された追加機能を提供します。特に、並行処理やプライベート接続に関する機能が強化されています。</p>
    </div>
  );
}
