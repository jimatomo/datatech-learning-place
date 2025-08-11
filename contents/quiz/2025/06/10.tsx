import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Advanced", "Security"],
    created_at: new Date("2025-06-10"),
    updated_at: new Date("2025-06-10"),

    // ----- quiz -----
    title: "Snowflake: SHOW GRANTS コマンドの理解度チェック",
    question_jsx: <QuizQuestion />,
    options: {
      0: "SHOW GRANTS ON DATABASE my_db; は、my_db データベースオブジェクトに対して付与されている権限を一覧表示する。",
      1: "SHOW GRANTS TO ROLE my_role; は、my_role ロールに付与されている権限や他のロールを一覧表示する。",
      2: "SHOW GRANTS OF ROLE my_role; は、my_role ロールが保持している権限の一覧を表示する。",
      3: "引数なしの SHOW GRANTS; は、現在のユーザーに付与されているロールを一覧表示する。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "SHOW GRANTS | Snowflake Documentation", url: "https://docs.snowflake.com/ja/sql-reference/sql/show-grants" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeの SHOW GRANTS コマンドに関する説明として、<strong className="text-red-500">誤っているもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        Snowflakeの SHOW GRANTS コマンドは、ロール、ユーザー、共有に付与された権限を確認するための重要なコマンドです。このコマンドには ON、TO、OF といった句があり、それぞれ異なる情報を表示します。これらの違いを理解することは、適切な権限管理に不可欠です。
      </p>

      <p className="py-2 font-semibold text-red-500">誤っている選択肢（正解）：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>SHOW GRANTS OF ROLE my_role; は、my_role ロールが保持している権限の一覧を表示する。：</strong>
          <br />
          これは<strong className="text-red-500">誤り</strong>です。SHOW GRANTS OF ROLE &lt;role_name&gt; は、指定したロールが<strong className="text-emerald-500">どのロールに付与されているか</strong>（ロール階層）を確認するために使用します。ロール自体に付与された権限（Privileges）を確認するには SHOW GRANTS TO ROLE &lt;role_name&gt; を使用します。この TO と OF の違いを正確に理解することが重要です。
        </li>
      </ul>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>SHOW GRANTS ON DATABASE my_db; は、my_db データベースオブジェクトに対して付与されている権限を一覧表示する。：</strong>
          <br />
          これは正しい説明です。ON 句は、特定のデータベースオブジェクト（テーブル、ビュー、スキーマ、データベースなど）に対して、どのロールにどのような権限が付与されているかを表示します。
        </li>
        <li className="pt-2">
          <strong>SHOW GRANTS TO ROLE my_role; は、my_role ロールに付与されている権限や他のロールを一覧表示する。：</strong>
          <br />
          これも正しい説明です。TO 句は、特定のプリンシパル（ロール、ユーザー、共有）に何が付与されているかを表示します。TO ROLE の場合、そのロールに直接付与された権限や、そのロールに付与された下位ロールの一覧が表示されます。
        </li>
        <li className="pt-2">
          <strong>引数なしの SHOW GRANTS; は、現在のユーザーに付与されているロールを一覧表示する。：</strong>
          <br />
          これも正しい説明です。引数なしで実行した場合、SHOW GRANTS TO USER &lt;current_user_name&gt;; と同等の結果を返し、コマンドを実行した現在のユーザーに付与されているロールを確認できます。
        </li>
      </ul>
    </div>
  );
} 
