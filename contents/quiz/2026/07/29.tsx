import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Composer",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Architecture", "Data Storage", "Data Management", "Data Modeling"],
    created_at: new Date("2026-07-29"),
    updated_at: new Date("2026-07-29"),

    title: "Slowly Changing Dimension Type 2の設計",
    question_jsx: <QuizQuestion />,
    options: {
      0: "属性が変更されるたびにディメンションへ新しい行を追加し、変更時点以降のファクトは新しい行のキーを参照する。",
      1: "同一メンバーが複数行になるため、ディメンションの主キーはナチュラルキーではなくサロゲートキーに一般化する。",
      2: "有効開始日時・有効終了日時・現在行フラグの最低3カラムを追加して、各行の有効期間を管理するのが定石である。",
      3: "属性変更時には過去のファクト行の外部キーも最新のディメンション行へ書き換えるため、変更前の属性でファクトを集計することはできない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Kimball Group - Type 2: Add New Row",
        url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/type-2/",
      },
      {
        title: "Kimball Group - Type 1: Overwrite",
        url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/type-1/",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        キンボール流のSlowly Changing Dimension（SCD）Type 2について、
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
        SCD Type 2は「変更履歴を行として積む」手法です。顧客の住所変更や
        営業担当の異動など、変更前の状態で過去を分析したい属性に使います。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          過去のファクト行は書き換えません。変更前に発生したファクトは当時のディメンション行を
          参照し続けるため、「その時点の属性」で正しく集計できます。
          これこそがType 2の価値であり、常に最新値で上書きするのはType 1の動きです。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>変更のたびに新しい行と新しいサロゲートキーを発行し、以降のファクトはそれを参照します。</li>
        <li>同一メンバーが複数行になるので、主キーはサロゲートキーに一般化します。</li>
        <li>有効開始・有効終了・現在行フラグの3カラムで、有効期間の特定と現在行の抽出を両立します。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        設計時は属性ごとに「過去をその時点の値で見たいか」を問うのが判断軸です。
        見たいならType 2、誤記修正のように履歴が不要ならType 1、と属性単位で使い分けます。
        全部Type 2にすると行が増えて運用が重くなるため、履歴が本当に必要な属性に絞るのが実務のコツです。
      </p>
    </div>
  );
}
