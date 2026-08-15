import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo with Grok",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Iceberg", "S3 Tables", "Datatech News"],
    created_at: new Date("2026-08-23"),
    updated_at: new Date("2026-08-23"),

    title: "S3 Tables Iceberg RESTカタログ統合がGAに",
    question_jsx: <QuizQuestion />,
    options: {
      0: "2026年8月10日にGAとなった。S3 TablesのIceberg RESTエンドポイントへSnowflakeが直接接続できる。",
      1: "CATALOG_API_TYPE = AWS_S3TABLES と SigV4認証を使い、CATALOG_NAME にはS3 TablesバケットのARNを指定する。",
      2: "ACCESS_DELEGATION_MODE は VENDED_CREDENTIALS のみで、外部ボリュームは使わない。catalog-linked databaseでテーブルを発見・参照する。",
      3: "この経路でもAWS Glue統合が必須であり、Lake Formationの権限設定なしではカタログを引けない。",
    },
    answers: [3],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "Snowflake Release Notes - Amazon S3 Tables Iceberg REST catalog integration GA (2026-08-10)",
        url: "https://docs.snowflake.com/en/release-notes/2026/other/2026-08-10-amazon-s3-tables-iceberg-rest-catalog-integration-ga",
      },
      {
        title: "Snowflake Documentation - Configure a catalog integration for Amazon S3 Tables",
        url: "https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-catalog-integration-rest-s3tables",
      },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        2026年8月10日にGeneral Availabilityとなった、SnowflakeからAmazon S3 Tables Iceberg RESTエンドポイントへのカタログ統合について、
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
        S3 TablesをSnowflakeから読む経路は、Glue経由とS3 Tables REST直結の2つになりました。
        今回GAなのは後者です。
      </p>
      <p className="font-semibold text-red-500 mt-2">誤っている記述（正答）:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          直結経路ではAWS Glue統合は不要です。
          Glue + Lake Formationは統一ガバナンスが欲しいときの別ルートで、今回のGAの前提ではありません。
        </li>
      </ul>
      <p className="font-semibold text-emerald-600">正しい記述:</p>
      <ul className="list-disc pl-4 py-2">
        <li>2026-08-10にGA。S3 TablesのIceberg RESTへSigV4で接続します。</li>
        <li>
          <code>CATALOG_API_TYPE = AWS_S3TABLES</code>、
          <code>CATALOG_NAME</code> はバケットARNです。
        </li>
        <li>
          認証委譲は <code>VENDED_CREDENTIALS</code> 固定で、外部ボリュームは使いません。
          catalog-linked databaseで名前空間とテーブルを同期します。
        </li>
      </ul>
      <p className="font-semibold text-amber-600 mt-2">持ち帰り:</p>
      <p>
        「S3 TablesをSnowflakeから見たい」ときは、まずGlueを挟む必要があるかを問う。
        カタログをS3 Tables側に閉じるなら直結、AWS側の権限をLake Formationに寄せるならGlue経路です。
      </p>
    </div>
  );
}
