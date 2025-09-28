import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Architecture", "Data Integration", "Data Modeling", "Data Management"],
    created_at: new Date("2025-10-04"),
    updated_at: new Date("2025-10-04"),

    // ----- quiz -----
    title: "インモンのCIFコンポーネントに関する理解",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ステージングエリアはETL（抽出・変換・取り込み）の処理を行う場所であり、エンドユーザーが直接利用することはない。保持データは主に一時的で、永続的な保存は最小限にとどまる。",
      1: "オペレーショナル・データストア（ODS）は業務データを統合して現在〜短期間（例: 30〜90日）のデータを保持し、低遅延な業務要件に応える。データは変化しやすく、データウェアハウス（DW）の一次ソースや監査にも用いられる。",
      2: "統合と変換レイヤーでは、異種ソースからのデータを組織標準の形式・モデルに統合し、DWやODSに取り込めるようにする。",
      3: "データマートはDWとは独立に構築され、常にODSを直接のソースとするため、全社的な統合は各データマートで個別に行われる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Operational data store (ODS)", url: "https://en.wikipedia.org/wiki/Operational_data_store" },
      { title: "Data warehouse", url: "https://en.wikipedia.org/wiki/Data_warehouse" },
      { title: "Data mart", url: "https://en.wikipedia.org/wiki/Data_mart" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        インモンが提唱するコーポレートインフォメーション・ファクトリー（CIF）の
        <strong>主要コンポーネント</strong>の説明として、
        <strong className="text-red-600">誤っているもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>以下が各選択肢の説明です：</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          ステージングエリアはETLを実行する中間領域で、エンドユーザーは直接参照しません。データは一時的なものが中心で、永続保持は最小限です。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          ODSは統合された現在〜短期間の業務データを保持し、変更が頻繁です。DWの一次ソースや監査の参照元としても用いられ、低遅延要求に応えます。
        </li>
        <li>
          <p className="font-semibold text-green-600">正しい記述:</p>
          統合と変換レイヤーでは、異種ソースのデータを組織標準へ整形・統合し、DW/ODSに取り込み可能な形にします。
        </li>
        <li>
          <p className="font-semibold text-red-500">誤っている記述（正答）:</p>
          CIFでは全社的な統合は原則DWで一度だけ行い、データマートはDWから配布されます。「常にODSを直接のソース」とするのは誤りです（例外的に戦術的なオペレーショナル・データマートがODSを参照する場合はありますが、CIFの基本方針ではありません）。
        </li>
      </ul>
    </div>
  );
}