import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Architecture", "Data Storage", "Governance", "Data Modeling"],
    created_at: new Date("2026-08-26"),
    updated_at: new Date("2026-08-26"),

    title: "Conformed Dimensionの使い所",
    question_jsx: <QuizQuestion />,
    options: {
      0: "受注ファクトと在庫ファクトで、商品のキー・名称・分類の意味を揃え、同じ行見出しでドリルアクロスしたい。",
      1: "部門マートごとに商品マスタを別定義し、同じSKUでも名称と階層が違っていても構わない。",
      2: "注文番号のように属性のない識別子を、ディメンション化せずファクトに残したい。",
      3: "出席のように金額列がなく、日付・学生・授業が出会ったことだけを行として残したい。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Kimball Group - Conformed Dimensions",
        url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/conformed-dimension/",
      },
      {
        title: "Kimball Group - Enterprise Data Warehouse Bus Architecture",
        url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/kimball-data-warehouse-bus-architecture/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        キンボール流のConformed Dimension（適合ディメンション）が
        <strong className="text-green-600">最も適切な場面</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        適合ディメンションは、別ファクトでも列名と値のドメインが同じマスタです。
        同じ行見出しで数値を並べられる（ドリルアクロス）ことが、エンタープライズ統合の本体です。
      </p>
      <p className="font-semibold text-emerald-600 mt-2">適切な場面（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          受注と在庫は別プロセスでも、商品属性が揃っていれば「商品×期間」で売上と在庫を同じ表に載せられます。
          ガバナンスと一度きりの設計で、再利用コストも下がります。
        </li>
      </ul>
      <p className="font-semibold text-red-500">他の場面:</p>
      <ul className="list-disc pl-4 py-2">
        <li>マートごとに意味がずれる商品マスタは、適合していない状態そのものです。</li>
        <li>属性のない注文番号はDegenerate Dimensionです。</li>
        <li>出席イベントはFactless Fact Tableの使い所です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        バスマトリクスの列（日付・顧客・商品など）を先に合意してから、行（業務プロセス）を1本ずつ作る。
        「同じ名前の列がある」だけでなく、値の意味まで揃っているかが適合の判定です。
      </p>
    </div>
  );
}
