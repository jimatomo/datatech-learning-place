import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "CLONE", "Snowflake Basic"],
    created_at: new Date("2025-09-22"),
    updated_at: new Date("2025-09-22"),

    // ----- quiz -----
    title: "SnowflakeのCLONE機能",
    question_jsx: <QuizQuestion />,
    options: {
      0: "CLONE を使用すると、データベース、スキーマ、テーブルなどのオブジェクトを迅速に複製できる。",
      1: "クローン作成直後は、元のオブジェクトとストレージを共有するため、追加のストレージコストは発生しない。",
      2: "クローンされたテーブルに行の追加や更新を行うと、変更部分に対応する新しいマイクロパーティションが作成され、ストレージを消費する。",
      3: "クローンを作成すると、元のテーブルのデータはすべて物理的にコピーされ、2倍のストレージ容量が必要になる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "テーブルのストレージに関する考慮事項 | Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/user-guide/tables-storage-considerations#label-cloning-tables",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeの <code>CLONE</code>{" "}
        機能に関する説明として、
        <strong className="text-red-600">誤っているもの</strong>
        はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">
        間違っている記述（正答）:
      </p>
      <p>
        「クローンを作成すると、元のテーブルのデータはすべて物理的にコピーされ、2倍のストレージ容量が必要になる」は誤りです。
      </p>
      <p className="pt-2">
        Snowflakeのクローニングは「Zero-Copy
        Cloning」と呼ばれ、クローン作成時点ではデータを物理的にコピーしません。代わりに、元のオブジェクトが持つマイクロパーティションのメタデータを共有します。そのため、クローン作成直後に追加のストレージコストは発生しません。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <code>CLONE</code>{" "}
          はデータベース、スキーマ、テーブルなど様々なオブジェクトを迅速に複製するための強力な機能です。
        </li>
        <li>
          クローンは元のデータポインタを共有するため、追加ストレージはゼロで瞬時に作成されます。
        </li>
        <li>
          クローンされたオブジェクト（または元のオブジェクト）に変更が加えられた場合にのみ、変更差分を保持するために新しいマイクロパーティションが作成され、その分のストレージが消費されます。
        </li>
      </ul>
    </div>
  );
}