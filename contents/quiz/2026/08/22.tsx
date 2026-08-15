import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Quality", "Governance", "Operation", "Data Management"],
    created_at: new Date("2026-08-22"),
    updated_at: new Date("2026-08-22"),

    title: "データ品質の6次元の見分け方",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Completeness（完全性）",
      1: "Validity（妥当性）",
      2: "Accuracy（正確性）",
      3: "Uniqueness（一意性）",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "GOV.UK - Meet the data quality dimensions",
        url: "https://www.gov.uk/government/news/meet-the-data-quality-dimensions",
      },
      {
        title: "GOV.UK - The Government Data Quality Framework",
        url: "https://www.gov.uk/government/publications/the-government-data-quality-framework/the-government-data-quality-framework",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        顧客マスタの「目の色」列は、許容値が blue / brown / green です。
        ある行は <code>blue</code> と入っており形式・許容値は満たしていますが、実物は茶色でした。
        この問題が主に該当するデータ品質の次元として、
        <strong className="text-green-600">最も適切なもの</strong>
        を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        DAMA UKが示す6次元は Accuracy / Completeness / Uniqueness / Consistency / Timeliness / Validity です。
        似た名前でも「何と照合するか」が違います。
      </p>
      <p className="font-semibold text-emerald-600 mt-2">適切な次元（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          Accuracyは、値が現実を正しく表しているかです。
          <code>blue</code> は形式として通っても、実物が茶色なら不正確です。
        </li>
      </ul>
      <p className="font-semibold text-red-500">他の次元:</p>
      <ul className="list-disc pl-4 py-2">
        <li>Validityは形式・型・範囲への適合です。pale のように許容外ならこちらです。</li>
        <li>Completenessは、その用途に必要な値が欠けていないかです。空欄の話ではありません。</li>
        <li>Uniquenessは、同一実体が複数行になっていないかです。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        チェックを足す前に「形式を見ているのか、現実を見ているのか」を先に決める。
        許容値チェックだけでは Accuracy は保証できないので、信頼できる突合先がある属性に限って正確性を測ります。
      </p>
    </div>
  );
}
