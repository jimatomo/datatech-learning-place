import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Master Data Mgmt", "Governance", "Data Management"],
    created_at: new Date("2025-09-06"),
    updated_at: new Date("2025-09-06"),

    // ----- quiz -----
    title: "財務マスターデータ管理の基本",
    question_jsx: <QuizQuestion />,
    options: {
      0: "財務マスターデータを一元管理することで、全社的な財務報告の整合性が向上し、迅速な意思決定を支援する。",
      1: "ERPシステムは財務マスターデータの中核的なリポジトリとして機能し、会計、購買、販売などのモジュール間でデータを連携させる。",
      2: "マスターデータの品質を維持するため、データスチュワードを任命し、データの標準化やクレンジングプロセスを定期的に実施することが推奨される。",
      3: "財務マスターデータは一度設定すれば変更は稀なため、各部門が独自にコピーを保持し、必要に応じて更新する方が効率的である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Master Data Management (MDM)", url: "https://www.snowflake.com/guides/master-data-management-mdm" },
      { title: "What is ERP (Enterprise Resource Planning)?", url: "https://www.oracle.com/erp/what-is-erp/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        財務マスターデータの管理に関する記述として、
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
        財務マスターデータは、企業の財務活動の基盤となる重要なデータです。その管理方法は、経営の効率性と正確性に直結します。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          <strong>「財務マスターデータを一元管理することで、全社的な財務報告の整合性が向上し、迅速な意思決定を支援する。」</strong>は正しい記述です。勘定科目、コストセンター、取引先などの財務マスターデータを一元的に管理することで、全社で統一された財務諸表を迅速に作成でき、経営層の正確な意思決定に貢献します。これがマスターデータ管理の主要なベネフィットの一つです。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          <strong>「ERPシステムは財務マスターデータの中核的なリポジトリとして機能し、会計、購買、販売などのモジュール間でデータを連携させる。」</strong>は正しい記述です。多くの企業では、ERPシステムが財務マスターデータ管理の中心的な役割を担います。マスターデータをERP内で一元管理することにより、各業務プロセスでデータの整合性が保たれ、手作業による入力ミスや非効率な連携作業を削減できます。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          <strong>「マスターデータの品質を維持するため、データスチュワードを任命し、データの標準化やクレンジングプロセスを定期的に実施することが推奨される。」</strong>は正しい記述です。データガバナンスの観点から、データスチュワードなどの責任者を定め、マスターデータの定義、品質基準、更新プロセスを明確にすることが不可欠です。定期的なデータクレンジングは、データの陳腐化を防ぎ、品質を維持するために重要です。
        </li>
        <li>
          <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
          <strong>「財務マスターデータは一度設定すれば変更は稀なため、各部門が独自にコピーを保持し、必要に応じて更新する方が効率的である。」</strong>は誤りです。各部門がマスターデータのコピーを独自に保持・更新することは、データのサイロ化を招きます。これにより、部門間でデータに不整合が生じ、全社的な財務報告の信頼性が損なわれる原因となります。マスターデータは一元管理されるべきです。
        </li>
      </ul>
    </div>
  );
}