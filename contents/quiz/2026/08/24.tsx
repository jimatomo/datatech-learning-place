import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Data Integration", "Data Storage", "Snowflake Basic"],
    created_at: new Date("2026-08-24"),
    updated_at: new Date("2026-08-24"),

    title: "内部ステージと外部ステージの使い分け",
    question_jsx: <QuizQuestion />,
    options: {
      0: "内部ステージはSnowflakeが管理するストレージで、ユーザー（@~）・テーブル（@%テーブル名）・名前付きの3種類がある。",
      1: "外部ステージはS3 / Azure / GCS上のファイルを指す名前付きオブジェクトで、URLと認証（推奨はストレージ統合）をまとめる。",
      2: "ローカルファイルのアップロードはPUTで行い、内部ステージにも外部ステージにも同じPUTで直接書き込める。",
      3: "名前付きステージはデータベースオブジェクトなので権限をロールへGRANTできる。ユーザー／テーブルステージはALTERやDROPできない。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Documentation - Overview of data loading",
        url: "https://docs.snowflake.com/en/user-guide/data-load-overview",
      },
      {
        title: "Snowflake Documentation - Choosing an internal stage for local files",
        url: "https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeのステージについて、
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
        ステージは「ロード／アンロードするファイルの置き場」です。中身がSnowflake管理か、クラウドバケットへのポインタかで内部と外部に分かれます。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          PUTはローカルから内部ステージへ上げるコマンドです。
          外部ステージの実体はS3等なので、ファイルはクラウド側へ先に置き、SnowflakeはCOPYで読みます。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>内部はユーザー・テーブル・名前付きの3種。参照はそれぞれ <code>@~</code>、<code>@%table</code>、<code>@name</code> です。</li>
        <li>外部はバケットURLと認証を名前付きオブジェクトにまとめます。定期ロードならストレージ統合が推奨です。</li>
        <li>複数ユーザー／複数テーブルで共有するなら名前付き。個人用ならユーザー、1テーブル専用ならテーブルステージです。</li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        まず「ファイルはSnowflakeの中に置くか、既存バケットを指すか」を決める。
        共有と権限管理が必要なら名前付き、手元からの一時ロードならユーザー／テーブルステージです。
      </p>
    </div>
  );
}
