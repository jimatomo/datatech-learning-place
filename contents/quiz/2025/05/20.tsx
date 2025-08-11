import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Snowflake Advanced", "Security", "Operation"],
    created_at: new Date("2025-05-20"),
    updated_at: new Date("2025-05-20"),

    // ----- quiz -----
    title: "Snowflakeのアクセス履歴（ACCESS_HISTORY）について",
    question_jsx: <QuizQuestion />,
    options: {
      0: "ACCESS_HISTORYビューは、Enterprise Edition（またはそれ以上）でのみ利用可能である。",
      1: "ACCESS_HISTORYビューは、QUERY_HISTORYビューと異なり、クエリがアクセスした具体的な列レベルでの情報を追跡することができる。",
      2: "ACCESS_HISTORYビューは、データの読み取り操作のみを追跡し、書き込み操作（INSERT、UPDATE、DELETE）は追跡しない。",
      3: "ACCESS_HISTORYビューは、ACCOUNT_USAGEスキーマとORGANIZATION_USAGEスキーマの両方で利用可能である。",
    },
    answers: [2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "アクセス履歴 - Snowflake Documentation", url: "https://docs.snowflake.com/ja/user-guide/access-history" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        Snowflakeのアクセス履歴（ACCESS_HISTORY）に関する説明として、<strong className="text-red-500">誤っているもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeのアクセス履歴（ACCESS_HISTORY）は、データアクセスの詳細な監査と分析を可能にする重要な機能です。
        QUERY_HISTORYビューと比較して、より細かい粒度でのアクセス情報を提供します。
      </p>

      <p className="py-2 font-semibold text-emerald-500">正しい選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>ACCESS_HISTORYビューは、Enterprise Edition（またはそれ以上）でのみ利用可能である。:</strong>
          <br />
          これは正しい説明です。ドキュメントには「アクセス履歴には、Enterprise Edition（またはそれ以上）が必要です。」と明記されています。
        </li>
        <li className="pt-2">
          <strong>ACCESS_HISTORYビューは、QUERY_HISTORYビューと異なり、クエリがアクセスした具体的な列レベルでの情報を追跡することができる。:</strong>
          <br />
          これは正しい説明です。ACCESS_HISTORYビューは、クエリがアクセスした具体的な列（ソース列、投影列、フィルターに使用された列など）の情報を追跡できます。
          一方、QUERY_HISTORYビューはクエリの実行情報を追跡しますが、列レベルの詳細は提供しません。
        </li>
        <li className="pt-2">
          <strong>ACCESS_HISTORYビューは、ACCOUNT_USAGEスキーマとORGANIZATION_USAGEスキーマの両方で利用可能である。:</strong>
          <br />
          これは正しい説明です。ドキュメントには「ACCOUNT_USAGE および ORGANIZATION_USAGE スキーマの ACCESS_HISTORY ビューをクエリすることで確認できます。」と記載されています。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-500">誤っている選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong className="text-red-500">ACCESS_HISTORYビューは、データの読み取り操作のみを追跡し、書き込み操作（INSERT、UPDATE、DELETE）は追跡しない。:</strong>
          <br />
          これは誤りです。ACCESS_HISTORYビューは、読み取り操作だけでなく、INSERT、UPDATE、DELETEなどの書き込み操作も追跡します。
          ドキュメントには「Snowflakeのアクセス履歴とは、ユーザークエリがデータを読み取り、SQLステートメントがINSERT、UPDATE、DELETEなどのデータ書き込み操作を、ソースデータオブジェクトからターゲットデータオブジェクトにCOPYコマンドのバリエーションとともに実行するときを指します。」と記載されています。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        ACCESS_HISTORYビューは、以下のような重要なユースケースで活用されます：
        <ul className="list-disc pl-6 pt-2">
          <li>規制コンプライアンス監査の実施</li>
          <li>データアクセスの詳細な分析と可視化</li>
          <li>セキュリティ監査と異常検知</li>
          <li>データ使用パターンの分析</li>
        </ul>
        QUERY_HISTORYビューと比較して、より細かい粒度でのアクセス情報を提供し、特に列レベルのアクセス追跡が可能な点が大きな特徴です。
        ただし、Enterprise Edition以上のライセンスが必要である点に注意が必要です。
      </p>
    </div>
  );
} 
