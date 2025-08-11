import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Modeling", "SQL", "Snowflake", "Snowfalke Data Load"],
    created_at: new Date("2025-04-02"),
    updated_at: new Date("2025-04-02"),

    // ----- quiz -----
    title: "SnowflakeのMERGEステートメントについて",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "MERGEステートメントで非決定的な結果が発生した場合、デフォルトではエラーが返される",
      1: "MERGEステートメントで非決定的な結果が発生した場合、ERROR_ON_NONDETERMINISTIC_MERGEパラメータをFALSEに設定すると、ランダムに1つの行が選択されて処理が実行される",
      2: "MERGEステートメントでは、WHEN MATCHED句とWHEN NOT MATCHED句を複数回使用することはできない",
      3: "MERGEステートメントのソーステーブルに複数の行が存在する場合、必ず非決定的な結果となる",
    },
    answers: [0, 1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "MERGE", url: "https://docs.snowflake.com/ja/sql-reference/sql/merge" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのMERGEステートメントは、テーブルの値を挿入、更新、削除するための強力なSQLコマンドです。
        MERGEステートメントの動作に関する説明として、正しいもの全てを選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        MERGEステートメントは、特に非決定的な結果が発生する可能性がある場合の動作が重要です。各選択肢について解説します。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>MERGEステートメントで非決定的な結果が発生した場合、デフォルトではエラーが返される:</strong>
          <br />
          これは正しい説明です。デフォルトでは、ERROR_ON_NONDETERMINISTIC_MERGEパラメータがTRUEに設定されており、非決定的な結果が発生した場合にエラーが返されます。これは、意図しないデータの更新を防ぐための安全な動作です。
        </li>
        <li className="pt-2">
          <strong>MERGEステートメントで非決定的な結果が発生した場合、ERROR_ON_NONDETERMINISTIC_MERGEパラメータをFALSEに設定すると、ランダムに1つの行が選択されて処理が実行される:</strong>
          <br />
          これも正しい説明です。ERROR_ON_NONDETERMINISTIC_MERGEをFALSEに設定すると、非決定的な結果が発生した場合でも、システムが1つの行を選択して処理を続行します。ただし、どの行が選択されるかは保証されません。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">不正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>MERGEステートメントでは、WHEN MATCHED句とWHEN NOT MATCHED句を複数回使用することはできない:</strong>
          <br />
          これは誤りです。MERGEステートメントでは、WHEN MATCHED句とWHEN NOT MATCHED句を複数回使用することができます。
          ただし、デフォルトの句（条件なしの句）は最後に配置する必要があります（条件なしの句に到達できるようにするため）。
        </li>
        <li className="pt-2">
          <strong>MERGEステートメントのソーステーブルに複数の行が存在する場合、必ず非決定的な結果となる:</strong>
          <br />
          これも誤りです。ソーステーブルに複数の行が存在しても、結合条件が一意である場合や、GROUP BYを使用して一意性を確保した場合など、決定的な結果となるケースがあります。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        MERGEステートメントは強力なデータ操作コマンドですが、非決定的な結果が発生する可能性があるため、注意深く使用する必要があります。
        特に、ERROR_ON_NONDETERMINISTIC_MERGEパラメータの設定を理解し、意図しないデータの更新を防ぐことが重要です。
      </p>
      <p className="pt-2">
        実務においてはそこまで複雑な結合条件を設定したりすることもなく、しっかりとQUALIFYなどを利用して一意性を確保するなどの工夫をしてシンプルに決定的にすることが多いです。
      </p>
    </div>
  );
} 
