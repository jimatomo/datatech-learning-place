import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "SQL", "Pipeline", "Datatech News"],
    created_at: new Date("2025-05-25"),
    updated_at: new Date("2025-05-25"),

    // ----- quiz -----
    title: "Snowflake の Flow Operator (パイプ演算子) の特徴と制限",
    question_jsx: <QuizQuestion />,
    options: {
      0: "パイプ演算子 (->>) は複数のSQL文を連鎖させ、前のSQL文の結果を後続の文の入力として使用できる。",
      1: "$n パラメータを使用して前のSQL文の結果を参照する際、FROM句、SELECT句、WHERE句のどこでも使用可能である。",
      2: "パイプチェーン内のいずれかのSQL文でエラーが発生すると、チェーン全体の実行が停止し、そのエラーがクライアントに返される。",
      3: "パイプ演算子を使用したクエリでは、前のクエリの入力結果セットと同じ順序で行が返されることは保証されておらず、ORDER BY句で順序を指定する必要がある。",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake Documentation - Flow operators", url: "https://docs.snowflake.com/en/sql-reference/operators-flow" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        Snowflake の Flow Operator（パイプ演算子）に関する記述として、<span className="text-red-500">間違っている</span>選択肢を選んでください。
      </span>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="py-2">
        選択肢の中で間違っているものは次のとおりです。
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>「$n パラメータを使用して前のSQL文の結果を参照する際、FROM句、SELECT句、WHERE句のどこでも使用可能である。」</strong>：これは間違った記述です。
          公式ドキュメントによると、「The $_n_ parameter is only valid in the FROM clause of a SQL statement.」と明記されており、
          $n パラメータはFROM句でのみ有効で、SELECT句やWHERE句では使用できません。（正確にはselect句の中で$1のように指定した場合は最初のカラムとして捉え方をされるので、意図した動作にはならないのです。）
        </li>
      </ul>
      <p className="py-2">
        その他の選択肢は正しい記述です：
      </p>
      <ul className="list-disc pl-4">
        <li className="pb-2">
          <strong>「パイプ演算子 (-&gt;&gt;) は複数のSQL文を連鎖させ、前のSQL文の結果を後続の文の入力として使用できる。」</strong>：
          これは正しい記述です。パイプ演算子の基本的な機能として、SQL文を連鎖させて前の結果を次の入力として使用できます。
        </li>
        <li className="pb-2">
          <strong>「パイプチェーン内のいずれかのSQL文でエラーが発生すると、チェーン全体の実行が停止し、そのエラーがクライアントに返される。」</strong>：
          これは正しい記述です。ドキュメントでは「An error raised by any SQL statement stops the execution of the chain, and that error is returned to the client.」と説明されています。
        </li>
        <li className="pb-2">
          <strong>「パイプ演算子を使用したクエリでは、前のクエリの入力結果セットと同じ順序で行が返されることは保証されておらず、ORDER BY句で順序を指定する必要がある。」</strong>：
          これは正しい記述です。ドキュメントでは「A query that uses the pipe operator isn&apos;t guaranteed to return rows in the same order as the input result set of a previous query in the chain. You can include an ORDER BY clause with the query to specify the order.」と明記されています。
        </li>
      </ul>
      <p className="pt-2">
        パイプ演算子は複雑なSQL操作の可読性と柔軟性を向上させる便利な機能ですが、使用時の制限事項を理解しておくことが重要です。
      </p>
    </div>
  );
} 
