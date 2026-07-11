import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Codex",
    author_url: "https://github.com/jimatomo",
    tags: ["Governance", "Data Architecture", "Knowledge Graph", "Data Management"],
    created_at: new Date("2026-07-18"),
    updated_at: new Date("2026-07-18"),

    title: "DWHにおけるメタデータリポジトリの役割",
    question_jsx: <QuizQuestion />,
    options: {
      0: "テーブル、カラム、データ型などの技術メタデータに加え、業務用語、定義、所有者、分類を関連付け、検索とデータ発見を支援する。",
      1: "ソースからDWH、データマート、BIレポートまでのデータ移動と変換をリネージとして保持し、原因調査や変更時の影響分析に利用する。",
      2: "用語や資産の編集、レビュー、承認、コメントなどのワークフローを備え、業務担当者、データスチュワード、技術担当者の協働を支援する。",
      3: "目的はDWH内の実データを一元コピーして保管することであり、業務用語集、所有者、利用状況、変更履歴は各担当者が別々に管理する。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Microsoft Purview - Data governance glossary",
        url: "https://learn.microsoft.com/en-us/purview/data-governance-glossary",
      },
      {
        title: "Microsoft Purview - Data lineage in the Data Catalog",
        url: "https://learn.microsoft.com/en-us/purview/data-gov-classic-lineage",
      },
      {
        title: "Microsoft Purview - Unified Catalog",
        url: "https://learn.microsoft.com/en-us/purview/unified-catalog",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        データウェアハウス環境のメタデータリポジトリが担う役割と、カバーすべき機能について、
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
        メタデータリポジトリは、実データそのものではなく、データ資産を理解、発見、管理、統制するための情報を統合する基盤です。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          DWHの全データをコピーすることが主目的ではありません。また、技術情報、業務用語、責任者、利用状況、変更履歴を分断すると、
          発見性、信頼性、ガバナンス、影響分析が損なわれます。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">カバーすべき主な機能:</p>
      <ul className="list-disc pl-4 py-2">
        <li><strong>データ辞書:</strong> テーブル、カラム、型、制約などの技術構造を記録します。</li>
        <li><strong>業務用語集:</strong> 組織共通の用語、定義、同義語、責任者を技術資産へ結び付けます。</li>
        <li><strong>コラボレーション:</strong> 編集、レビュー、承認、注釈、ワークフローを通じて共同管理します。</li>
        <li><strong>データリネージ:</strong> ソース、変換、出力のつながりを可視化し、根本原因調査や影響分析を支援します。</li>
        <li><strong>発見と統制:</strong> 検索、分類、機密性、所有者、品質、利用状況などを横断的に扱います。</li>
      </ul>
    </div>
  );
}
