import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
// CodeBlockをインポートしましたが、利用箇所がないため削除します
// import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Basic"],
    created_at: new Date("2025-05-05"),
    updated_at: new Date("2025-05-05"),

    // ----- quiz -----
    title: "SnowflakeのUDFとストアドプロシージャの違い",
    question_jsx: <QuizQuestion />,
    options: {
      0: "UDFは主に計算やデータ変換を行い、単一の値またはテーブルを返すことを目的とする。",
      1: "ストアドプロシージャは複数のSQLステートメントを実行でき、トランザクション制御（COMMIT, ROLLBACK）を含むことができる。",
      2: "UDFはSELECT文などのSQLクエリ内で直接呼び出すことができるが、ストアドプロシージャはCALL文を使用して呼び出す必要がある。",
      3: "ストアドプロシージャは値を返すことができない。",
      4: "UDFとストアドプロシージャは、どちらもSQL以外にJavaScript、Java、Python、Scalaなどの言語で記述できる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "ユーザー定義関数の概要 - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/developer-guide/udf/udf-overview"
      },
      {
        title: "ストアドプロシージャの概要 - Snowflake Documentation",
        url: "https://docs.snowflake.com/ja/developer-guide/stored-procedure/stored-procedures-overview"
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeにおけるユーザー定義関数（UDF）とストアドプロシージャに関する記述のうち、<span className="text-red-500">誤っているもの</span>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        各選択肢の解説は以下の通りです。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong className="text-emerald-500">UDFは主に計算やデータ変換を行い、単一の値またはテーブルを返すことを目的とする。</strong>：これは正しい記載です。
          UDFはスカラー関数（単一値を返す）またはテーブル関数（表形式の結果を返す）として定義され、入力に基づいて値を計算・返却します。SQLクエリ内で他の式と同様に使用できます。
        </li>
        <li>
          <strong className="text-emerald-500">ストアドプロシージャは複数のSQLステートメントを実行でき、トランザクション制御（COMMIT, ROLLBACK）を含むことができる。</strong>：これも正しい記載です。
          ストアドプロシージャは、一連のSQL操作をグループ化し、手続き的なロジック（条件分岐、ループなど）を実行するために使用されます。トランザクション管理もプロシージャ内で行うことができます。
        </li>
        <li>
          <strong className="text-emerald-500">UDFはSELECT文などのSQLクエリ内で直接呼び出すことができるが、ストアドプロシージャはCALL文を使用して呼び出す必要がある。</strong>：これも正しい記載です。
          UDFはSQL式の一部として呼び出されます（例: `SELECT my_udf(column1) FROM table;`）。一方、ストアドプロシージャは独立したステートメントとして`CALL my_procedure(argument1);`のように呼び出されます。
        </li>
        <li>
          <strong className="text-red-500">ストアドプロシージャは値を返すことができない。</strong>：これは誤った記載です。
          ストアドプロシージャも`RETURN`句を使用して値を返すことができます。ただし、UDFのようにSELECT文内で直接その戻り値を使用することはできません。通常、`CALL`ステートメントの結果として返されるか、セッション変数などに格納して後続の処理で利用します。
        </li>
        <li>
          <strong className="text-emerald-500">UDFとストアドプロシージャは、どちらもSQL以外にJavaScript、Java、Python、Scalaなどの言語で記述できる。</strong>：これは正しい記載です。
          UDFはSQL、JavaScript、Java、Python、Scalaで記述できます。ストアドプロシージャも同様に、Snowflake Scripting（SQLベース）に加え、Java、JavaScript、Python、Scalaで記述することが可能です。これにより、開発者は使い慣れた言語で複雑なロジックを実装できます。
        </li>
      </ul>
    </div>
  );
} 
