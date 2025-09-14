import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["dbt", "SQL", "Data Modeling"],
    created_at: new Date("2025-09-17"),
    updated_at: new Date("2025-09-17"),

    // ----- quiz -----
    title: "dbt seedのユースケース",
    question_jsx: <QuizQuestion />,
    options: {
      0: "国コードと国名のマッピングリスト",
      1: "分析から除外するためのテスト用メールアドレスのリスト",
      2: "本番データベースからエクスポートされた大規模なCSVファイル形式の生データ",
      3: "従業員のアカウントIDのリスト",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Add Seeds to your DAG | dbt Docs", url: "https://docs.getdbt.com/docs/build/seeds" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        <code>dbt seed</code>のユースケースとして<strong className="text-red-600">不適切</strong>なものは次のうちどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
      <p>
        本番データベースからエクスポートされた大規模なCSVファイル形式の生データ：これは<code>dbt seed</code>の不適切なユースケースです。
      </p>
      <br />
      <p>
        <code>dbt seed</code>は、バージョン管理され、コードレビューが可能であるため、頻繁に変更されない静的なデータに適しています。
        国コードのリスト、テスト用のメールアドレス、従業員IDリストなどは良いユースケースです。
      </p>
      <p>
        しかし、大規模なCSVファイル、特に本番の生データをロードするにはパフォーマンスが適しておらず、<code>dbt seed</code>を使うべきではありません。
        そのような場合は、他のデータロードツールを使用することが推奨されます。
      </p>
    </div>
  );
}