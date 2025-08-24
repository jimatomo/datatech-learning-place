import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Lightdash", "dbt", "SQL", "Data Application"],
    created_at: new Date("2025-08-29"),
    updated_at: new Date("2025-08-29"),

    // ----- quiz -----
    title: "BIツール「Lightdash」の特徴",
    question_jsx: <QuizQuestion />,
    options: {
      0: "dbtプロジェクトを迅速にフルスタックのBIプラットフォームに変換する。",
      1: "ユーザー数やロール数に制限なく利用できるプランを提供する。",
      2: "AI Analyst機能を活用し、自然言語でのデータ探索を可能にする。",
      3: "データの可視化や共有機能は提供するが、埋め込み分析には対応していない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Lightdash: The BI platform built for dbt", url: "https://www.lightdash.com/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        dbtと連携して利用されるBIツール「Lightdash」の特徴として、<strong className="text-red-600">誤っているもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
      <p className="py-2">
        「データの可視化や共有機能は提供するが、埋め込み分析には対応していない」は誤りです。Lightdashは顧客向けのアプリケーションなどに分析ダッシュボードを埋め込む機能（Embedded Analytics）を提供しています。
      </p>

      <p className="font-semibold text-green-600 pt-2">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <b>dbtプロジェクトとの連携:</b> Lightdashはdbtプロジェクトを直接参照し、定義されたメトリクスやモデルを元にBIプラットフォームを構築します。これにより、データ定義の一元管理と迅速な可視化を実現します。
        </li>
        <li>
          <b>無制限のユーザー数:</b> Lightdashは多くのプランでユーザー数やロール数に制限を設けておらず、組織全体でのデータ活用を促進します。
        </li>
        <li>
          <b>AI Analyst機能:</b> 自然言語で質問をすると、AIがレポート作成やデータ探索を支援するAI Analyst機能を提供しており、専門家でなくてもセルフサービスでデータ分析が可能です。
        </li>
      </ul>
    </div>
  );
}

