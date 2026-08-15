import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "Governance", "Snowflake Advanced"],
    created_at: new Date("2026-08-18"),
    updated_at: new Date("2026-08-18"),

    title: "Dynamic Data Maskingの条件と適用範囲",
    question_jsx: <QuizQuestion />,
    options: {
      0: "マスキングポリシーはスキーマレベルのオブジェクトで、テーブルやビューの列に適用する。クエリ時に列の出現箇所へポリシーが差し込まれる。",
      1: "1つの列に同時に付けられるマスキングポリシーは1つまでである。付け替えるときは既存の関連を外してから新しいポリシーを付ける。",
      2: "ポリシー本体をALTERすれば、既に付けた何千列へ再APPLYしなくても新しい条件が効く。",
      3: "CURRENT_ROLE() を条件に書けば、ロール階層で継承した権限も自動的にマスク解除の対象になる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Documentation - Understanding Dynamic Data Masking",
        url: "https://docs.snowflake.com/en/user-guide/security-column-ddm-intro",
      },
      {
        title: "Snowflake Documentation - Advanced Column-level Security topics",
        url: "https://docs.snowflake.com/en/user-guide/security-column-advanced",
      },
      {
        title: "Snowflake Documentation - IS_ROLE_IN_SESSION",
        url: "https://docs.snowflake.com/en/sql-reference/functions/is_role_in_session",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowflakeのDynamic Data Maskingについて、
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
        Dynamic Data Maskingは保存データを書き換えず、クエリ時の見せ方だけをロール文脈で変えます。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <code>CURRENT_ROLE()</code> が見るのはセッションの現在ロールだけです。
          親ロール経由で権限を継承していても、名前が一致しなければマスクは外れません。
          階層を条件に含めるなら <code>IS_ROLE_IN_SESSION()</code> を使います。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>ポリシーはスキーマオブジェクトで、テーブル／ビューの列に付けます。</li>
        <li>1列に重ね掛けはできず、付け替えはUNSETしてからSETします。</li>
        <li>条件の変更はポリシー本体の更新で足り、列への再適用は不要です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        マスク解除の条件は「今使っているロール名」か「階層に含まれるか」で書き方が変わる。
        カスタムロールを親にまとめているなら、最初から <code>IS_ROLE_IN_SESSION</code> を選ぶ。
      </p>
    </div>
  );
}
