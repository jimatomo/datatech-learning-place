import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Edition", "Features"],
    created_at: new Date("2025-01-04"),
    updated_at: new Date("2025-01-04"),

    // ----- quiz -----
    title: "SnowflakeのEnterprise EditionとBusiness Critical Editionの機能差",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "PHI データのサポート（HIPAA と HITRUST CSF 規制に準拠）", 
      1: "外部関数向けのAmazon API Gatewayプライベートエンドポイント", 
      2: "クエリアクセラレーション", 
      3: "専用のメタデータストアとコンピューティングリソースのプール（仮想ウェアハウスで使用）", 
      4: "AWS PrivateLink、Azure Private Link、またはGoogle Cloud Private Service Connectを使用したSnowflakeサービスへのプライベート接続のサポート"
    },
    answers: [0, 1, 4],
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
      <p>以下の機能のうち、Business Critical Editionで利用可能だが、Enterprise Editionでは利用できない機能はどれですか？</p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>Enterprise EditionとBusiness Critical Editionの主な機能差は以下の通りです：</p>
      <ul className="py-2 space-y-2">
        <li>・<strong>Business Critical Editionのみで利用可能な機能：</strong>
          <br />- PHI データのサポート（HIPAA と HITRUST CSF 規制に準拠）
          <br />- 外部関数向けのAmazon API Gatewayプライベートエンドポイント
          <br />- AWS PrivateLinkを使用したSnowflakeサービスへのプライベート接続
        </li>
        <li>・<strong>両エディションで利用可能な機能：</strong>
          <br />- クエリアクセラレーション
        </li>
      </ul>
      <p className="pb-2">Business Critical Editionは、Enterprise Editionのすべての機能に加えて、より高いレベルのデータ保護を提供し、非常に機密性の高いデータを扱う組織のニーズをサポートします。特に、HIPAA/HITRUST CSF規制準拠のPHIデータや、専用のリソースプールなどが特徴です。</p>
      <p>専用のメタデータストアとコンピューティングリソースのプール（仮想ウェアハウスで使用）が利用できるのはVirtual Private Snowflake（VPS）だけです。</p>
    </div>
  );
}
