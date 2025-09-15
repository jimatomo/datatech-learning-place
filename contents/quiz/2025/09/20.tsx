import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Master Data Mgmt", "Data Hub", "Data Management"],
    created_at: new Date("2025-09-20"),
    updated_at: new Date("2025-09-20"),

    // ----- quiz -----
    title: "マスターデータハブの3つの実装アプローチ",
    question_jsx: <QuizQuestion />,
    options: {
      0: "レジストリアプローチ: マスターデータを各記録システム内に保持しつつ、それらを指す中央インデックスを構築する。実装は比較的容易だが、複数のシステムからデータを統合する際に複雑なクエリやビジネスルールが必要になることがある。",
      1: "トランザクションハブアプローチ: ハブがマスターデータの唯一の正式な記録システムとなる。データの一貫性とガバナンスは向上するが、関連するビジネスルールをハブという単一のシステム内に実装する必要がある。",
      2: "統合アプローチ: 各記録システムの局所的マスターデータを共通リポジトリに複製・統合し、データ共有ハブを正式な参照システムとする。これにより記録システムへの直接アクセスは不要になるが、データ複製による遅延が生じる可能性がある。",
      3: "アプリケーションの観点から見ると、トランザクションハブアプローチは、各記録システムの実装に最も高い柔軟性を提供し、企業全体の視点との分離を容易にする。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "データマネジメント知識体系ガイド 第二版", url: "https://www.amazon.co.jp/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E7%9F%A5%E8%AD%98%E4%BD%93%E7%B3%BB%E3%82%AC%E3%82%A4%E3%83%89-%E7%AC%AC%E4%BA%8C%E7%89%88-DAMA-International/dp/4296100491" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        マスターデータハブ環境を実装するための3つの基本的なアプローチに関する記述として、
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
        マスターデータハブの実装には、主にレジストリ、トランザクションハブ、統合（ハイブリッド）の3つのアプローチがあります。それぞれに特徴とトレードオフがあり、組織の要件に応じて最適なものを選択する必要があります。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          <strong>レジストリアプローチ</strong>は、既存の記録システム（System of Record）への変更を最小限に抑え、比較的迅速に実装できる利点があります。マスターインデックスを通じて各システムのデータにアクセスしますが、データを組み合わせる際のクエリが複雑になりがちで、システム間の意味的な差異を吸収するためのビジネスルールも複数箇所で必要になる可能性があります。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          <strong>トランザクションハブアプローチ</strong>は、ハブをマスターデータの唯一の「信頼できる単一の情報源（Single Source of Truth）」と位置づけます。これにより、データ品質とガバナンスが大幅に向上します。ただし、関連するビジネスルールをすべてハブという単一のシステム内に実装する必要があり、その設計と実装が複雑になる可能性があります。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          <strong>統合アプローチ</strong>は、レジストリとトランザクションハブのハイブリッド型です。各システムは局所的なマスターデータを持ち続けますが、それらがデータ共有ハブに複製・統合され、企業全体の参照点となります。記録システムへの影響を限定しつつ、一元的な参照を可能にしますが、データの複製と同期に伴う遅延（レイテンシ）が課題となることがあります。
        </li>
        <li>
          <p className="font-semibold text-red-500">誤っている記述（正答）:</p>
          この記述は誤りです。トランザクションハブアプローチは、マスターデータをハブに一元化し、そこを唯一の更新点とするため、最も密結合なアーキテクチャです。各記録システムはマスターデータ管理機能をハブに委譲する必要があり、実装の柔軟性はむしろ低下します。企業全体の視点と各システムの実装を分離しやすく、柔軟性が高いのはレジストリアプローチや統合アプローチです。
        </li>
      </ul>
    </div>
  );
}