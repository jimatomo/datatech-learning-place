import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Master Data Mgmt", "Data Governance", "Data Management"],
    created_at: new Date("2025-08-30"),
    updated_at: new Date("2025-08-30"),

    // ----- quiz -----
    title: "パーティーマスターデータ",
    question_jsx: <QuizQuestion />,
    options: {
      0: "顧客、サプライヤー、従業員など、ビジネスに関わる個人や組織に関する基本的な情報を含む。",
      1: "CRMシステムにおいて、顧客情報の一元管理を可能にし、顧客サービスの向上に寄与する。",
      2: "データの分散や重複を防ぎ、業務プロセスの効率化と内部統制の強化に役立つ。",
      3: "主に一度登録されると変更されることのない静的なデータであるため、頻繁な更新は必要ない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "マスターデータとは？種類やMDMの必要性、管理のポイントを解説", url: "https://blog.trocco.io/glossary/masterdata" },
      { title: "Party Master Data Management: The Key to Customer Success", url: "https://semarchy.com/blog/party-master-data-management/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        パーティーマスターデータに関する説明として
        <strong className="text-red-600">最も不適切なもの</strong>
        を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        パーティーマスターデータは、企業の活動における中心的な役割を担うデータであり、常に最新かつ正確な状態に保つ必要があります。
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          パーティーマスターには、顧客（個人・法人）、サプライヤー、従業員など、企業活動に関わるすべての「パーティー（関係者）」の情報が含まれます。CRMシステムでは、このデータを活用して顧客との関係を管理・強化します。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          部署ごとに散在しがちな顧客情報を一元管理することで、全社で一貫した顧客対応が可能となり、パーソナライズされたサービス提供を通じて顧客満足度を向上させることができます。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          データの重複や表記の揺れをなくし、一貫性を保つことで、無駄な業務を削減し、データに基づいた迅速な意思決定を支援します。これは内部統制の観点からも重要です。
        </li>
        <li>
          <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
          パーティーマスターデータは静的ではありません。結婚による姓の変更、住所移転、部署異動など、時間とともに関係者の情報は変化します。そのため、データの鮮度を保つための継続的なメンテナンスと更新が不可欠です。
        </li>
      </ul>
    </div>
  );
}