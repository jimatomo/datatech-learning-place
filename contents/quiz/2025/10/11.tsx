import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Architecture", "Data Integration", "Data Modeling", "Data Management"],
    created_at: new Date("2025-10-11"),
    updated_at: new Date("2025-10-11"),

    // ----- quiz -----
    title: "キンボール流ディメンショナルDW: スタースキーマとDWバスの基礎",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ファクトは売上数量・金額などの業務プロセスから生じる量的な測定値を保持し、ディメンションは顧客・商品・日付・店舗などファクトを記述する属性を持つ。スタースキーマではファクトテーブルが複数のディメンションテーブルと外部キーで結合される。",
      1: "複数のファクトテーブルで共通に利用されるディメンションを適合（Conformed）ディメンションと呼び、これらの共有・整合の指針をDWバスとして設計することで、データマート横断の一貫した分析が可能になる。",
      2: "キンボールではオペレーショナル・ソースシステムから取り込んだデータをステージング領域で統合・クレンジング・変換し、データプレゼンテーション領域（データマート群）に配信する。これはインモンのCIFにおける統合＋変換＋DW部分の組み合わせに相当するが、よりエンドユーザーの分析配信にフォーカスしている。",
      3: "データプレゼンテーション領域の各データマートは原則として独自のディメンションを持ち、他マートとディメンションを共有しないため、同義の属性でもマートごとに定義が異なることが前提となる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Star schema", url: "https://en.wikipedia.org/wiki/Star_schema" },
      { title: "Dimensional modeling", url: "https://en.wikipedia.org/wiki/Dimensional_modeling" },
      { title: "Fact table", url: "https://en.wikipedia.org/wiki/Fact_table" },
      { title: "Dimension (data warehouse)", url: "https://en.wikipedia.org/wiki/Dimension_(data_warehouse)" },
      { title: "Extract, transform, load", url: "https://en.wikipedia.org/wiki/Extract,_transform,_load" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        キンボール流のディメンショナル・データウェアハウスに関する次の記述のうち、
        <strong className="text-red-600">誤っているもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          ファクトは業務プロセス由来の量的測定値（売上数・金額など）を保持し、
          ディメンションはそれらを説明する属性（顧客・商品・日付・店舗など）を持ちます。
          スタースキーマでは中央のファクトテーブルが複数のディメンションと外部キーで結合されます。
        </li>
        <li>
          適合（Conformed）ディメンションの共有と整合を図る設計をDWバスととらえ、
          これにより売上ファクトと在庫ファクトのような複数ファクト間で一貫した軸による横断分析が可能になります。
        </li>
        <li>
          オペレーショナル・ソースシステムで生成されたデータはステージング領域で統合・クレンジング・変換され、
          データプレゼンテーション領域（データマート群）へ配信されます。これはCIFの統合＋変換＋DWに相当しますが、
          キンボールはエンドユーザーへの分析配信を重視し、スコープはCIFの企業データ管理よりも小さく実装志向です。
        </li>
      </ul>

      <p className="font-semibold text-red-500">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          「各データマートが独自ディメンションのみを持ち共有しない」は誤りです。キンボールでは共通の適合ディメンションを
          共有する前提でDWバスを設計し、マート間の一貫性を担保します。
        </li>
      </ul>

      <p className="mt-2">補足（データアクセスツール）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          キンボールのアプローチはエンドユーザー要件を重視します。BI/可視化/SQLツールなど、
          利用者の分析体験に適したデータアクセスツールの採用と、
          適合ディメンションを中心とした一貫したスキーマ提供が重要です。
        </li>
      </ul>
    </div>
  );
}
