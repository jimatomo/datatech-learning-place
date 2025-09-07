import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "Storage Storage", "Snowflake Advanced"],
    created_at: new Date("2025-09-09"),
    updated_at: new Date("2025-09-09"),

    // ----- quiz -----
    title: "Snowflakeから異なるクラウドプロバイダーへのデータアクセス",
    question_jsx: <QuizQuestion />,
    options: {
      0: "Snowflakeのストレージ統合（Storage Integration）機能を利用してGCSバケットに直接接続する",
      1: "GCSと同じGoogle Cloud Platform上に新しいSnowflakeアカウントを契約し、データを移行する",
      2: "GCSからAWS S3へデータを定期的にレプリケーションし、S3からSnowflakeにデータを取り込む",
      3: "外部ステージ作成時に、GCSのサービスアカウントキーを直接認証情報として埋め込む",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      {
        title: "CREATE STORAGE INTEGRATION",
        url: "https://docs.snowflake.com/ja/sql-reference/sql/create-storage-integration",
      },
      {
        title: "Google Cloud Storageの統合の構成",
        url: "https://docs.snowflake.com/ja/user-guide/data-load-gcs-config",
      }
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <p>
        AWS上で契約しているSnowflakeアカウントから、Google Cloud Storage (GCS) 上のデータにアクセスする必要があります。データ転送の遅延や追加の管理コストを最小限に抑え、<strong className="text-green-600">最も効率的かつ安全に</strong>これを実現する方法はどれですか？
      </p>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        Snowflakeは、主要なクラウドプロバイダー（AWS, GCP, Azure）間でシームレスなデータアクセスを可能にする機能を提供しています。
      </p>
      <br />
      <p className="font-semibold text-green-600">正解の選択肢:</p>
      <p>
        <strong>Snowflakeのストレージ統合（Storage Integration）機能を利用してGCSバケットに直接接続する</strong>
      </p>
      <ul className="list-disc pl-4 py-2">
        <li>
          ストレージ統合は、Snowflakeが異なるクラウドプロバイダーのストレージサービスに安全にアクセスするために設計された仕組みです。認証情報をSnowflakeオブジェクト内にカプセル化することで、ステージ作成時に認証情報を直接記述する必要がなくなり、セキュリティが向上します。また、追加のデータパイプラインやインフラが不要なため、最もコスト効率と管理効率が高い方法です。
        </li>
      </ul>
      <p className="font-semibold text-red-500">不正解の選択肢:</p>
      <ul className="list-disc pl-4 py-2">
        <li>
          <strong>GCSと同じGoogle Cloud Platform上に新しいSnowflakeアカウントを契約し、データを移行する:</strong>
          <br />
          これは技術的には可能ですが、新しいSnowflakeアカウントの契約は大幅なコスト増につながり、既存のアカウントとのデータ連携など管理が複雑になります。非効率的な選択肢です。
        </li>
        <li>
          <strong>GCSからAWS S3へデータを定期的にレプリケーションし、S3からSnowflakeにデータを取り込む:</strong>
          <br />
          GCSからS3へのデータ転送料金が発生するほか、レプリケーションのパイプラインを構築・維持するための管理コストもかかります。データの鮮度もレプリケーションの頻度に依存するため、リアルタイム性に欠けます。
        </li>
        <li>
          <strong>外部ステージ作成時に、GCSのサービスアカウントキーを直接認証情報として埋め込む:</strong>
          <br />
          これはセキュリティ上のリスクが非常に高い方法です。認証情報がコードやステージ定義に平文で含まれることになり、漏洩のリスクがあります。Snowflakeではストレージ統合の利用がベストプラクティスとされています。（そもそもGCSの場合はストレージ統合のみしかオプションがない）
        </li>
      </ul>
    </div>
  );
}