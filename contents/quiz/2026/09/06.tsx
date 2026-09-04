import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Governance", "Security", "Datatech News"],
    created_at: new Date("2026-09-06"),
    updated_at: new Date("2026-09-06"),

    title: "Multi-value tagsがGAに",
    question_jsx: <QuizQuestion />,
    options: {
      0: "2026年8月25日にGAとなった。CREATE TAG で MULTI_VALUE = TRUE を付けると、同じタグに複数の文字列値を持てる。",
      1: "値の追加・削除は ADD VALUE / DROP VALUE を使う。SET TAG は集合全体を1つの文字列で置き換え、追記ではない。",
      2: "既定の上限はオブジェクトあたり10値。マルチ値にしたタグを後から単一値へ戻すことはできない。",
      3: "複数値が付いたオブジェクトでは SYSTEM$GET_TAG が全値を配列で返す。マスキングポリシー条件からも同じ関数で参照できる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Release Notes - Multi-value tags GA (2026-08-25)",
        url: "https://docs.snowflake.com/en/release-notes/2026/other/2026-08-25-multi-value-tags-ga",
      },
      {
        title: "Snowflake Documentation - Multi-value tags",
        url: "https://docs.snowflake.com/en/user-guide/object-tagging/multi-value-tags",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        2026年8月25日にGeneral AvailabilityとなったSnowflakeのmulti-value tagsについて、
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
        標準タグはオブジェクトあたり1値です。互いに排他でない分類（複数ソース、複数コンプライアンス）を1タグに載せるのがマルチ値です。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          値が2つ以上あると <code>SYSTEM$GET_TAG</code> はエラーになります。
          確認は <code>SYSTEM$TAG_VALUE_CONTAINS</code> を使います。
          マスキング／行アクセスの条件もマルチ値タグは参照できません。ポリシー用は単一値タグに分けます。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>2026-08-25にGA。<code>MULTI_VALUE = TRUE</code> が必須で、一度付けると戻せません。</li>
        <li>足す・外すは ADD/DROP。SET は上書きなので、既存値を消さないよう注意します。</li>
        <li>伝播の <code>ON_CONFLICT = MERGE</code> はマルチ値タグ専用です。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「分類のラベルを複数載せたい」ならマルチ値、「ポリシーの分岐条件に使いたい」なら従来の単一値。
        同じオブジェクトに両方を載せ分け、ポリシーからはマルチ値を読まない。
      </p>
    </div>
  );
}
