import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Materialized View", "Performance", "Snowflake Basic"],
    created_at: new Date("2025-09-15"),
    updated_at: new Date("2025-09-15"),

    // ----- quiz -----
    title: "マテリアライズドビューのメンテナンス",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ベーステーブルのデータが変更されるたびに、マテリアライズドビューは自動的にバックグラウンドで更新（メンテナンス）される。",
      1: "マテリアライズドビューのメンテナンスには、Snowflakeのクレジットが消費される。",
      2: "共有されたテーブルに対してマテリアライズドビューを作成した場合、共有元がデータを変更しても、自身のクレジットは消費されない。",
      3: "マテリアライズドビューを `SUSPEND` することで、メンテナンスを一時停止し、クレジットの消費を抑えることができる。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "マテリアライズドビュー",
        url: "https://docs.snowflake.com/ja/user-guide/views-materialized",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        Snowflakeのマテリアライズドビューのメンテナンスに関する記述として<strong className="text-red-600">誤っているもの</strong>はどれか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="font-semibold text-red-500">間違っている記述（正答）:</p>
      <p>
        「共有されたテーブルに対してマテリアライズドビューを作成した場合、共有元がデータを変更しても、自身のクレジットは消費されない」という記述は誤りです。他のアカウントから共有されたテーブルに対してマテリアライズドビューを作成した場合、共有元のデータが変更されると、その変更を反映するために自分のアカウントでメンテナンスが実行され、クレジットが消費されます。
      </p>
      <br />
      <p className="font-semibold text-green-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>マテリアライズドビューは、ベーステーブルのデータが変更されると、Snowflakeによって自動的にバックグラウンドでメンテナンスされます。</li>
        <li>この自動メンテナンス処理はコンピュートリソースを必要とするため、Snowflakeのクレジットを消費します。</li>
        <li><code>ALTER MATERIALIZED VIEW ... SUSPEND</code> を実行することで、マテリアライズドビューのメンテナンスを一時停止できます。これにより、ベーステーブルが変更されてもビューは更新されなくなり、メンテナンスコストが発生しなくなります。</li>
      </ul>
    </div>
  );
}