import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Architecture", "Data Storage", "Data Management", "Data Modeling"],
    created_at: new Date("2026-08-05"),
    updated_at: new Date("2026-08-05"),

    title: "退化ディメンション（Degenerate Dimension）の使い所",
    question_jsx: <QuizQuestion />,
    options: {
      0: "注文番号やチケット番号など、興味深い属性が他ディメンションへ移ったあとに残るトランザクション制御番号を、ファクト表に直接置くことが多い。",
      1: "対応するディメンション表は持たないが、関連する明細行をまとめるグルー（糊）として機能する。",
      2: "ヘッダー／明細の粒度では、ヘッダー側の制御番号が明細ファクトの退化ディメンションになる典型パターンがある。",
      3: "顧客名・商品カテゴリ・店舗住所などの記述属性も、JOINを避けるためにファクト表へ直接置き、それを退化ディメンションと呼ぶ。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Kimball Group - Design Tip #46: Another Look At Degenerate Dimensions",
        url: "https://www.kimballgroup.com/2003/06/design-tip-46-another-look-at-degenerate-dimensions/",
      },
      {
        title: "Kimball Group - Fact Tables and Dimension Tables",
        url: "https://www.kimballgroup.com/2003/01/fact-tables-and-dimension-tables/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        ディメンショナルモデリングにおける退化ディメンション（Degenerate Dimension）について、
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
        退化ディメンションは「ディメンションキーなのに、対応するディメンション表がない」例外パターンです。
        属性のない制御番号を無理に独立表へ切り出さないための設計です。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          顧客名や商品カテゴリなどの記述属性をファクトへ直置きするのは退化ディメンションではありません。
          それらは通常のディメンション表へ切り出します。JOIN回避のために属性をファクトへ埋めるのは、よくある誤解です。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>注文番号などは属性を失ったあとに残る自然キーで、ファクトに直置きします。</li>
        <li>同じバスケット／伝票の明細をまとめる用途で価値があります。</li>
        <li>明細粒度のファクトに、親ヘッダーの伝票番号をDDとして載せるのが定番です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        ディメンション表がファクトと同じペースで肥大化し始めたら、中身のないヘッダー属性を無理に切り出していないか疑いましょう。
        制御番号だけが残るなら、退化ディメンションとしてファクトに置く方が健全です。
      </p>
    </div>
  );
}
