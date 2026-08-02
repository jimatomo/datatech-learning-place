import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Architecture", "Governance", "Operation", "Data Management"],
    created_at: new Date("2026-08-08"),
    updated_at: new Date("2026-08-08"),

    title: "Data Meshの基本思想と4原則",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ドメイン指向の分散所有により、分析データの責任を中央チーム一極から、ドメインに近いチームへ移す。",
      1: "Data as a Productとして、発見しやすく品質と利用体験を備えたデータ資産を提供する。",
      2: "セルフサーブなデータ基盤プラットフォームにより、各ドメインがインフラ詳細に依存しすぎずにデータプロダクトを構築できるようにする。",
      3: "Data Meshは、全社の分析データを単一の中央チームが集中管理し、ドメインチームはデータを利用するだけのアーキテクチャを指す。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Martin Fowler - Data Mesh Principles and Logical Architecture",
        url: "https://martinfowler.com/articles/data-mesh-principles.html",
      },
      {
        title: "Data Mesh Architecture - Principles",
        url: "https://www.datamesh-architecture.com/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Zhamak Dehghaniが提唱するData Meshの基本思想について、
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
        Data Meshは大規模組織で分析データ活用をスケールさせるための社会技術的アプローチです。
        技術スタック名ではなく、所有・プロダクト・基盤・ガバナンスの組み合わせが本体です。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          中央チームによる一極集中管理は、むしろData Meshが避けようとするパターンです。
          所有はドメインへ分散し、横断ルールはフェデレーテッドな計算可能なガバナンスで担保します。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>ドメイン所有でスケールアウトを狙います。</li>
        <li>データプロダクトとして発見性・品質・利用体験を重視します。</li>
        <li>セルフサーブ基盤がドメインの自律運用を支えます。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「湖や倉庫を入れ替えたか」ではなく、「誰がどのデータプロダクトに責任を持ち、横断ルールをどう自動適用するか」が導入判断の軸です。
        技術だけ先に分散させると、責任境界のない分断データになります。
      </p>
    </div>
  );
}
