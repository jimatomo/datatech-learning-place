import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Masking Policy", "Snowflake Advanced"],
    created_at: new Date("2025-08-26"),
    updated_at: new Date("2025-08-26"),

    // ----- quiz -----
    title: "マスキングポリシーにおける INVOKER_ROLE の挙動",
    question_jsx: <QuizQuestion />,
    options: {
      0: "クエリを実行しているセッションの現在のロール",
      1: "マスキングポリシーが設定されているテーブルのオーナーロール",
      2: "クエリの対象となっているビューのオーナーロール",
      3: "SYSADMIN ロール",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Advanced Column-level Security topics | Snowflake Documentation",
        url: "https://docs.snowflake.com/en/user-guide/security-column-advanced",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeのマスキングポリシーの条件式内でコンテキスト関数を利用する際、あるビューを経由してポリシーが適用されたテーブルにクエリが実行された場合、<code>INVOKER_ROLE()</code>
        関数が返すロールとして<strong className="text-green-600">正しいもの</strong>を1つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのマスキングポリシーでは、コンテキスト関数を使用して動的なマスキングを実現できます。その中でも <code>CURRENT_ROLE()</code> と <code>INVOKER_ROLE()</code> は特に重要な関数です。
      </p>
      <br />
      <p className="font-semibold text-green-600">正解の選択肢 (ビューのオーナーロール):</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          この記述は正しいです。<code>INVOKER_ROLE()</code> はSQLステートメントの実行コンテキストに依存します。クエリがビューを介して実行された場合、<code>INVOKER_ROLE()</code> はそのビューのオーナー（所有者）のロールを返します。これにより、誰がクエリを実行したか（<code>CURRENT_ROLE</code>）ではなく、どのオブジェクト（ビュー）を通じてデータにアクセスしているかに基づいてマスキングロジックを制御できます。
        </li>
      </ul>
      <p className="font-semibold text-red-500">不正解の選択肢:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          「クエリを実行しているセッションの現在のロール」を返すのは <code>CURRENT_ROLE()</code> 関数です。<code>INVOKER_ROLE()</code> はセッションのロールではなく、実行コンテキスト（ビューやUDFのオーナーなど）を返します。
        </li>
        <li>
          「マスキングポリシーが設定されているテーブルのオーナーロール」は、直接テーブルをクエリした場合には返される可能性がありますが、ビューを経由した場合はビューのオーナーロールが優先されます。
        </li>
        <li>
          「SYSADMIN ロール」は特定のコンテキストでのみ返されるものであり、常に返されるわけではありません。
        </li>
      </ul>
    </div>
  );
}