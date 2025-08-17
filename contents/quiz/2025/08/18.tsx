import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Data Integration", "Snowflake", "Snowflake Basic"],
    created_at: new Date("2025-08-18"),
    updated_at: new Date("2025-08-18"),

    // ----- quiz -----
    title: "Snowpipe REST APIによるデータロード",
    question_jsx: <QuizQuestion />,
    options: {
      0: "エンドポイントへのリクエスト認証には、キーペア認証が使用される。",
      1: "クライアントは、insertFilesエンドポイントを呼び出すことで、ファイルのロードを要求する。",
      2: "AWS Lambda関数を使用してREST APIを呼び出し、S3にステージングされたファイルのロードを自動化することができる。",
      3: "データのロードは、ユーザーが管理する仮想ウェアハウスで実行されるため、ウェアハウスのサイズや状態を事前に確認する必要がある。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowpipe REST エンドポイントのデータロードの概要",
        url: "https://docs.snowflake.com/ja/user-guide/data-load-snowpipe-rest-overview",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        SnowpipeのREST APIを利用したデータロードに関する記述として、<strong className="text-red-600">誤っているもの</strong>はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p className="pb-2">
        SnowpipeのREST APIは、継続的なデータロードをプログラムで管理するための強力なインターフェースです。その仕組みと特徴を正しく理解することが重要です。
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong>エンドポイントへのリクエスト認証には、キーペア認証が使用される。</strong>
          ：これは正しい説明です。インジェスションサービスはクライアントセッションを維持しないため、通常のユーザー名/パスワード認証ではなく、キーペア認証が用いられます。
        </li>
        <li>
          <strong>クライアントは、insertFilesエンドポイントを呼び出すことで、ファイルのロードを要求する。</strong>
          ：これも正しい説明です。クライアントアプリケーションは、データファイル名のリストとパイプ名を指定して insertFiles エンドポイントを呼び出し、ロードプロセスを開始します。
        </li>
        <li>
          <strong>AWS Lambda関数を使用してREST APIを呼び出し、S3にステージングされたファイルのロードを自動化することができる。</strong>
          ：これも正しい説明です。S3イベント通知をトリガーとしてLambda関数を起動し、その関数内からSnowpipeのREST APIを呼び出すことで、ファイルロードのプロセスを自動化できます。
        </li>
        <li>
          <strong className="text-red-500">
            データのロードは、ユーザーが管理する仮想ウェアハウスで実行されるため、ウェアハウスのサイズや状態を事前に確認する必要がある。
          </strong>
          ：これが誤りです。Snowpipeによるデータロードは、Snowflakeが提供・管理するサーバーレスのコンピューティングリソースを使用します。そのため、ユーザーが仮想ウェアハウスを管理する必要はありません。
        </li>
      </ul>
      <p className="pt-2">
        Snowpipeの大きな利点の一つは、コンピューティングリソースの管理をSnowflakeに任せられる点です。これにより、データロードの運用負荷が大幅に軽減されます。
      </p>
    </div>
  );
}