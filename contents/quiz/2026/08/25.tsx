import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Security", "Governance", "Snowflake Advanced"],
    created_at: new Date("2026-08-25"),
    updated_at: new Date("2026-08-25"),

    title: "Row Access Policyの適用範囲と制限",
    question_jsx: <QuizQuestion />,
    options: {
      0: "スキーマレベルのオブジェクトで、式はBOOLEANを返す。評価はクエリ実行者ではなくポリシー所有者のロールで行われる。",
      1: "ポリシーを付けると、可視でない行のINSERTも拒否され、UPDATE / DELETEも不可視行には届かない。",
      2: "SELECTに加え、UPDATE / DELETE / MERGEが対象にする行の選択にも効く。同じポリシーを複数のテーブルやビューへ付けられる。",
      3: "同じ列を、行アクセスポリシーのシグネチャとマスキングポリシーのシグネチャの両方に同時指定できる。",
    },
    answers: [1, 3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Documentation - Understanding row access policies",
        url: "https://docs.snowflake.com/en/user-guide/security-row-intro",
      },
      {
        title: "Snowflake Documentation - CREATE ROW ACCESS POLICY",
        url: "https://docs.snowflake.com/en/sql-reference/sql/create-row-access-policy",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowflakeのRow Access Policyについて、
        <strong className="text-red-600">誤っているもの</strong>
        を2つ選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Row Access Policyは、行を返すかどうか（TRUE/FALSE）をクエリ時に決める行レベルセキュリティです。列の値を書き換えるマスキングとは役割が違います。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          現状、INSERTは止めません。可視行のUPDATE / DELETEも防ぎません。
          「見えない＝書けない」ではない点に注意します。
        </li>
        <li>
          1つの列は、行アクセスのシグネチャかマスキングのシグネチャか、どちらか一方にしか使えません。
          両方を同時指定はできません。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>評価はポリシー所有者の権限で行うので、マッピング表をクエリ実行者にGRANTしなくても済みます。</li>
        <li>SELECTと、更新系が読む行集合に効きます。1ポリシーを複数オブジェクトへ再利用できます。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        読み取りの行フィルタと、書き込み制限は別物として設計する。
        列は「行を決めるキー」と「隠す対象」で分け、同じ列に両方のポリシーを載せない。
      </p>
    </div>
  );
}
