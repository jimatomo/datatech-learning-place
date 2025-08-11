import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Modeling", "SQL", "Snowflake"],
    created_at: new Date("2025-04-09"),
    updated_at: new Date("2025-04-09"),

    // ----- quiz -----
    title: "SnowflakeのPIVOT関数について",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "PIVOT関数は、行を列に変換する際に、集約関数（SUM、AVG、COUNTなど）を使用する必要がある",
      1: "PIVOT関数では、IN句で指定する値のリストは、必ず静的に(明示的に)指定する必要がある",
      2: "PIVOT関数を使用する際、ソーステーブルのNULL値は自動的に0に変換される",
      3: "PIVOT関数の結果として生成される列名は、必ず引用符で囲む必要がある",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "PIVOT", url: "https://docs.snowflake.com/ja/sql-reference/constructs/pivot" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのPIVOT関数は、行を列に変換するための強力なSQL機能です。
        PIVOT関数の動作に関する説明として、正しいものを選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        PIVOT関数は、データの行と列を変換する際に非常に便利な機能です。各選択肢について解説します。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>PIVOT関数は、行を列に変換する際に、集約関数（SUM、AVG、COUNTなど）を使用する必要がある:</strong>
          <br />
          これは正しい説明です。PIVOT関数では、行を列に変換する際に、必ず集約関数を使用する必要があります。
          これは、複数の行が同じキー値を持つ場合に、それらの値をどのように結合するかを指定するためです。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">不正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>PIVOT関数では、IN句で指定する値のリストは、必ず静的に(明示的に)指定する必要がある:</strong>
          <br />
          これは誤りです。Snowflakeでは、ANYキーワードやサブクエリを使用して、動的にピボット値を指定することができます。
          これをダイナミックピボットと呼びます。
        </li>
        <li className="pt-2">
          <strong>PIVOT関数を使用する際、ソーステーブルのNULL値は自動的に0に変換される:</strong>
          <br />
          これも誤りです。NULL値は自動的には変換されません。NULL値を特定の値に変換したい場合は、
          DEFAULT ON NULL句を使用して明示的に指定する必要があります。
        </li>
        <li className="pt-2">
          <strong>PIVOT関数の結果として生成される列名は、必ず引用符で囲む必要がある:</strong>
          <br />
          これも誤りです。AS句を使用して列名を変更する場合、引用符で囲む必要はありません。
          また、SELECT句で列を明示的に指定する際にも、引用符は必須ではありません。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        PIVOT関数は、データの行と列を変換する際に非常に便利な機能ですが、その動作を正確に理解することが重要です。
        特に、集約関数の使用は必須であり、NULL値の扱いや列名の指定方法など、細かい点にも注意が必要です。
      </p>
      <p className="pt-2">
        実務においては、PIVOT関数を使用して月次データを横持ちに変換したり、カテゴリ別の集計を行ったりするなど、
        様々な場面で活用することができます。
      </p>
    </div>
  );
} 
