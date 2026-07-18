import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "SQL", "IaC", "Snowflake Basic"],
    created_at: new Date("2026-07-20"),
    updated_at: new Date("2026-07-20"),

    title: "CREATE OR ALTER TABLEの宣言的DDL",
    question_jsx: <QuizQuestion />,
    options: {
      0: "テーブルが存在しなければ定義どおりに作成し、存在すれば定義に合わせて変更し、すでに一致していれば何もしない。",
      1: "同じステートメントを何度実行しても結果が同じになるため、新規環境と既存環境の両方で回すテーブルデプロイスクリプトに向いている。",
      2: "列の追加や削除は検出できるが、列のリネームは判定できない。リネームしたい場合はALTER TABLE ... RENAME COLUMNを使う。",
      3: "定義に含まれない列を自動的にリネームして目的の列名へ寄せるため、明示的なRENAMEは不要である。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Documentation - CREATE TABLE (CREATE OR ALTER TABLE)",
        url: "https://docs.snowflake.com/en/sql-reference/sql/create-table#create-or-alter-table",
      },
      {
        title: "Snowflake Documentation - CREATE OR ALTER (no renaming limitation)",
        url: "https://docs.snowflake.com/en/sql-reference/sql/create-or-alter",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeの<code>CREATE OR ALTER TABLE</code>について、
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
        <code>CREATE OR ALTER</code>は倉庫やビューなど複数オブジェクトで使えますが、
        ここではテーブル定義の宣言的デプロイに焦点を当てます。
        欲しい最終状態を書き、Snowflakeが差分を計算して適用します。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          定義から消えた列と新しく現れた列は、リネームではなく「削除＋追加」として扱われます。
          データを保ったまま名前だけ変えたいときは、<code>ALTER TABLE ... RENAME COLUMN</code>を使います。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>未作成ならCREATE、既存ならALTER相当の差分適用、一致済みならno-opです。</li>
        <li>冪等なので、同じテーブル定義スクリプトを新規アカウントにも既存アカウントにも流せます。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        テーブルDDLを「手順の列挙」ではなく「望ましい状態の宣言」に寄せるならCREATE OR ALTER TABLE、
        列リネームのような意図が差分から読み取れない操作は明示的なALTERを併用する、と覚えると実務で迷いにくいです。
      </p>
    </div>
  );
}
