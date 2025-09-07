import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Data Storage", "Security", "Snowflake Basic"],
    created_at: new Date("2025-09-08"),
    updated_at: new Date("2025-09-08"),

    // ----- quiz -----
    title: "SnowflakeのScoped URLについて",
    question_jsx: <QuizQuestion />,
    options: {
      0: "BUILD_SCOPED_FILE_URL 関数を使用して生成される。",
      1: "Scoped URLを生成したユーザーのみが、そのURLを使用してファイルにアクセスできる。",
      2: "特定のロールにファイルアクセスを許可するため、ビューを介してScoped URLを提供するなどの用途で利用される。",
      3: "Scoped URLは永続的なURLであり、一度発行されると有効期限はなく、権限を持つ任意のユーザーがアクセスできる。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Introduction to unstructured data",
        url: "https://docs.snowflake.com/en/user-guide/unstructured-intro",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeのステージ上のファイルに一時的なアクセスを許可するScoped URLに関する記述のうち、<strong className="text-red-600">誤っているもの</strong>はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
      <p>
        「Scoped URLは永続的なURLであり、一度発行されると有効期限はなく、権限を持つ任意のユーザーがアクセスできる」という記述は誤りです。Scoped URLは、ステージ上のファイルへの一時的なアクセスを提供するために設計されており、永続的ではありません。有効期限は、クエリ結果のキャッシュ期間（通常24時間）に制限されます。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>Scoped URLは <code>BUILD_SCOPED_FILE_URL</code> 関数を使用して生成されます。</li>
        <li>セキュリティ上の理由から、Scoped URLを生成したユーザーのみがそのURLを使用できます。他のユーザーがアクセスすることはできません。</li>
        <li>特定のロールにファイルアクセスを許可するためビューを介してURLを共有したり、カスタムアプリケーションで利用されたりします。</li>
      </ul>
      <br />
      <p>
        永続的なURLが必要な場合は、File URL（<code>BUILD_STAGE_FILE_URL</code>関数で生成）を使用します。File URLには有効期限がありませんが、アクセスするにはステージに対する適切な権限を持つロールが必要になります。
      </p>
    </div>
  );
}