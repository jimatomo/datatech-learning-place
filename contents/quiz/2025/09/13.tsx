import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Master Data Mgmt", "ERP", "PLM", "Data Management"],
    created_at: new Date("2025-09-13"),
    updated_at: new Date("2025-09-13"),

    // ----- quiz -----
    title: "製品マスターデータ管理と関連システム",
    question_jsx: <QuizQuestion />,
    options: {
      0: "PLM（製品ライフサイクル管理）システムは、製品の企画・設計から保守・廃棄に至るまでの全ライフサイクル情報を管理し、製品マスターデータの設計情報や部品構成（BOM）の源泉となる。",
      1: "ERP（統合基幹業務システム）は、SKU（最小在庫管理単位）をキーとして販売、在庫、会計情報を管理し、製品マスターデータの中核として機能することが多い。",
      2: "MES（製造実行システム）は、製造現場のリアルタイムな作業指示や実績を管理し、製品の品質データや製造履歴を製品マスターデータに連携する役割を担う。",
      3: "CRM（顧客関係管理）システムは、顧客との関係性を管理するシステムであり、製品マスターデータの設計情報や技術仕様を一元的に管理する主要なリポジトリとして機能する。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "What is PLM (Product Lifecycle Management)?", url: "https://www.autodesk.com/solutions/plm" },
      { title: "顧客関係管理（CRM）とは?", url: "https://www.salesforce.com/jp/crm/what-is-crm/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        製品マスターデータの管理と、それに関連する各種システムの役割に関する記述として、
        <strong className="text-red-600">最も不適切なもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        製品マスターデータは、企業活動の根幹をなす製品情報を一元管理するものであり、様々な業務システムと連携して利用されます。各システムの役割を正しく理解することが重要です。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          <strong>PLMシステム</strong>は、製品のアイデア創出から設計、製造、販売、保守、そして最終的な廃棄に至るまで、製品のライフサイクル全体にわたる情報を一元管理します。特に、CADデータや設計仕様、部品構成表（BOM）といった技術情報のマスターとなり、製品マスターデータの重要な源泉となります。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          <strong>ERPシステム</strong>は、企業の基幹業務（販売、購買、在庫、会計など）を統合的に管理します。製品マスターデータは、特に<strong>SKU</strong>単位で管理され、価格、在庫数、サプライヤー情報などが紐づけられます。これにより、サプライチェーン全体で製品情報が同期され、効率的な業務運営が可能になります。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          <strong>MESシステム</strong>は、製造現場のオペレーションをリアルタイムで監視・管理するシステムです。製品マスターデータから製造指示を受け取り、実際の製造実績（どのロットがいつ、どのラインで製造されたか）や品質検査結果を記録します。これらの実績データは、トレーサビリティの確保や品質向上のために製品マスターデータと連携されます。
        </li>
        <li>
          <p className="font-semibold text-red-500">不適切な記述（正答）:</p>
          <strong>CRMシステム</strong>は、主に顧客情報、商談履歴、マーケティング活動、カスタマーサポートといった顧客との関係性に焦点を当てた情報を管理します。製品の設計情報や技術仕様、BOMなどを管理するのはPLMやPDM（製品データ管理）システムの役割であり、CRMシステムが製品マスターデータの主要なリポジトリとなることはありません。CRMは販売実績などから顧客の製品購入履歴を参照することはありますが、技術情報のマスターではありません。
        </li>
      </ul>
    </div>
  );
}