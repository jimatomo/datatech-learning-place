import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "SQL", "Style Guide", "Data Modeling"],
    created_at: new Date("2025-03-19"),
    updated_at: new Date("2025-03-19"),

    // ----- quiz -----
    title: "dbtのベストプラクティス：Staging Modelのプラクティス",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "ステージングモデルはソーステーブルとの1対1の関係を持ち、source()を使用する唯一の場所である（Sourceのテーブルのエントリーポイントとしての役割を持つ）",
      1: "ステージングモデルでは主にリネーム、型変換、基本的な計算、カテゴリ化などの変換が行われるべきである",
      2: "パフォーマンスを向上させるため、ステージングモデルはテーブルとしてマテリアライズするのがベストプラクティスである",
      3: "ステージングモデルでは、データの集計（aggregation）やテーブル結合（join）を積極的に活用すべきである",
    },
    answers: [0, 1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Staging: Preparing our atomic building blocks", url: "https://docs.getdbt.com/best-practices/how-we-structure/2-staging" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div className="space-y-4">
      <p className="pb-4">
        dbt Labsが提唱するベストプラクティスにおけるステージングモデルに関する以下の記述のうち、正しいものをすべて選んでください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-3">
        dbtのステージングモデルは、下流のモデルで利用する基本的な構成要素を準備するための重要な層です。
      </p>
      <p className="pb-2">
        <strong>ステージングモデルの正しいプラクティス：</strong>
      </p>
      <ul className="list-disc pl-4 pb-3">
        <li className="pb-2">ステージングモデルはソーステーブルとの1対1の関係を持ち、source()マクロを使用する唯一の場所です。これによりソーステーブルのエントリーポイントとして機能します。</li>
        <li>ステージングモデルでは主にリネーム、型変換、基本的な計算、カテゴリ化などの変換が行われるべきです。</li>
      </ul>
      <p className="pb-2">
        <strong>避けるべきプラクティス：</strong>
      </p>
      <ul className="list-disc pl-4 pb-3">
        <li className="pb-2">パフォーマンス面でも、ステージングモデルはテーブルではなくビューとしてマテリアライズするのが推奨されています。これにより最新データへのアクセスが保証され、ストレージの無駄遣いを防ぎます。</li>
        <li>ステージングモデルでは、データの集計（aggregation）やテーブル結合（join）の使用は避けるべきです。これらを使用すると、データの粒度が変わり、重複計算や混乱した関係性が発生する可能性があります。</li>
      </ul>
    </div>
  );
} 
