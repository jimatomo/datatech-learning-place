import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Semi-structured", "VARIANT", "OBJECT", "ARRAY"],
    created_at: new Date("2025-02-04"),
    updated_at: new Date("2025-02-04"),

    // ----- quiz -----
    title: "Snowflakeの半構造化データ型の特徴について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "VARIANT型は、保存可能な非圧縮データの最大サイズが60MBであり、内部オーバーヘッドは発生しない。",
      1: "OBJECT型は、キーがVARCHAR型であり、値はVARIANT型として格納されるため、異なるデータ型を混在させることができる。",
      2: "ARRAY型は、事前に要素数を決定する必要があり、要素の追加や削除はできない。",
      3: "VARIANT型は、数値、文字列、オブジェクト、配列などあらゆるデータ型の値を保存できる。",
      4: "OBJECT型とARRAY型は、それぞれ独立した型であり、相互に組み合わせて使用することはできない。"
    },
    answers: [1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake Semi-structured Data Types", url: "https://docs.snowflake.com/en/sql-reference/data-types-semistructured" }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span className="break-all">
        Snowflakeの半構造化データ型（VARIANT、OBJECT、ARRAY）に関して、正しい説明を2つ選択してください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        選択肢1と3が正解です。
      </p>
      <p className="pt-2">
        正しい説明の詳細：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          OBJECT型は、キーがVARCHAR型で値がVARIANT型として格納されます。
          これにより、1つのオブジェクト内で文字列、数値、配列など、異なるデータ型の値を柔軟に組み合わせることができます。
        </li>
        <li>
          VARIANT型は、Snowflakeの半構造化データ型の中で最も柔軟性が高く、あらゆるデータ型（スカラー値、配列、オブジェクトなど）を格納できます。
        </li>
      </ul>
      <p className="mt-2">
        誤った説明の解説：
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          VARIANT型の最大サイズは16MBであり、内部オーバーヘッドにより実際の保存可能サイズはさらに小さくなります。
        </li>
        <li>
          ARRAY型は動的であり、ARRAY_APPEND、ARRAY_INSERT、ARRAY_REMOVE等の関数を使用して要素の追加・削除が可能です。
        </li>
        <li>
          OBJECT型とARRAY型は組み合わせて使用でき、これによりJSON形式のような複雑な階層構造を表現できます。
        </li>
      </ul>
      <p className="mt-2">
        Snowflakeの半構造化データ型は、特にJSON、Avro、Parquetなどの形式でデータを扱う際に強力な機能を提供します。
        これらのデータ型を適切に組み合わせることで、複雑なデータ構造を効率的に管理できます。
      </p>
    </div>
  );
} 

