import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Iceberg", "Snowflake Advanced"],
    created_at: new Date("2025-04-29"),
    updated_at: new Date("2025-04-29"),

    // ----- quiz -----
    title: "SnowflakeのIcebergテーブルについて",
    question_jsx: <QuizQuestion />,
    options: {
      0: "データとメタデータファイルは外部クラウドストレージに保存される。",
      1: "SnowflakeはIcebergテーブルに対してFail-safeストレージを提供する。",
      2: "Query Acceleration ServiceはすべてのIcebergテーブルでサポートされている。",
      3: "カタログとして外部カタログを使用する場合でも、テーブルのクローニングが可能である。",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Apache Iceberg™ テーブル", url: "https://docs.snowflake.com/ja/user-guide/tables-iceberg" },
    ],
  });

  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p className="pb-4">
        SnowflakeのApache Iceberg™ テーブルに関する説明として、<strong>正しいもの</strong>を選択してください。
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        SnowflakeのApache Iceberg™ テーブルは、Snowflakeのパフォーマンスとクエリセマンティクスを維持しつつ、ユーザーが管理する外部クラウドストレージを利用できるテーブルタイプです。
      </p>

      <p className="py-2 font-semibold text-green-600">正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>データとメタデータファイルは外部クラウドストレージに保存される。:</strong>
          <br />
          これは正しい説明です。Icebergテーブルは、データファイルとメタデータファイルをAmazon S3、Google Cloud Storage、またはAzure Storageなどの外部クラウドストレージに保存します。Snowflakeは外部ボリュームを使用してこれらのストレージロケーションに接続します。
        </li>
      </ul>

      <p className="py-2 font-semibold text-red-600">不正解の選択肢：</p>
      <ul className="list-disc pl-6">
        <li>
          <strong>SnowflakeはIcebergテーブルに対してFail-safeストレージを提供する。:</strong>
          <br />
          これは誤りです。ドキュメントには「Snowflakeは、Icebergテーブルの Fail-safe ストレージを提供しません。」と明記されています。外部クラウドストレージのデータ保護と回復はユーザーの責任となります。
        </li>
        <li className="pt-2">
          <strong>Query Acceleration ServiceはすべてのIcebergテーブルでサポートされている。:</strong>
          <br />
          これも誤りです。ドキュメントの「サポート対象外機能」セクションには、Query Acceleration Serviceが現在すべてのIcebergテーブルでサポートされていない機能の一つとして挙げられています。
        </li>
        <li className="pt-2">
          <strong>カタログとして外部カタログを使用する場合でも、テーブルのクローニングが可能である。:</strong>
          <br />
          これも誤りです。ドキュメントの「サポート対象外機能」セクションによると、「外部カタログを使用する Icebergテーブル」ではクローニングはサポートされていません。Snowflakeをカタログとして使用する場合はクローニングが可能です。
        </li>
      </ul>

      <p className="pt-4">
        <strong>まとめ:</strong>
        <br />
        SnowflakeのIcebergテーブルは、データレイク内のデータを直接Snowflakeで扱えるようにする強力な機能ですが、通常のSnowflakeテーブルとは異なる特性や制約があります。特に、ストレージ管理（Fail-safe非提供）や、一部のSnowflake機能（Query Acceleration Service、外部カタログ利用時のクローニングなど）がサポートされていない点に注意が必要です。
      </p>
    </div>
  );
} 
