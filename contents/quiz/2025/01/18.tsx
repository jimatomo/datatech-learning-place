import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Advanced", "Security"],
    created_at: new Date("2025-01-18"),
    updated_at: new Date("2025-01-18"),

    // ----- quiz -----
    title: "Snowflakeのセカンダリーロールの特徴",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "現在アクティブなセカンダリロールは、現在のユーザーが SQL アクションを実行するために必要な権限を持っているかどうかを決定するコンテキストを設定します", 
      1: "オブジェクトを作成するためのCREATE文の実行権限を含むあらゆる権限がセカンダリーロールによって提供される", 
      2: "USE SECONDARY ROLES <ロール名> で個別のロールを引き受ける設定が可能である", 
      3: "セッションが続いている間に新しいロールが付与されても、そのロールはセッション中に有効にならない", 
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Snowflake Documentation - USE SECONDARY ROLES", url: "https://docs.snowflake.com/ja/sql-reference/sql/use-secondary-roles" },
      { title: "Snowflake Documentation - CREATE SESSION POLICY", url: "https://docs.snowflake.com/en/sql-reference/sql/create-session-policy" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <h1>Snowflakeのセカンダリーロールについて、正しい説明を選んでください</h1>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>Snowflakeのセカンダリーロールには、以下の特徴があります：</p>
      <ul className="py-2 space-y-2">
        <li>・USE SECONDARY ROLES ALLコマンドを使用すると、プライマリロールに加えて、ユーザーに付与されているすべてのロールが有効になります</li>
        <li>・オブジェクトを作成するために CREATE &lt;オブジェクト&gt; ステートメントを実行する認証は、プライマリロールによって提供されることに注意してください</li>
        <li>・クイズ作成時点では USE SECONDARY ROLES は ALL or NONE しかオプションがありません。制御をするためにはセッションポリシーの利用が必要です</li>
        <li>・各SQLステートメントが実行されると、ロールのセットが再評価され、新しく付与されたロールや取り消されたロールが反映されます</li>
      </ul>
      <p>
        ユーザのオプションとして DEFAULT_SECONDARY_ROLES を (&apos;ALL&apos;) に設定することで、
        ユーザーがログインするときにセカンダリーロールが自動的に有効になります。
        なかなかに扱いの難しい仕組みなので利用する際には注意が必要です。
      </p>
    </div>
  );
}

