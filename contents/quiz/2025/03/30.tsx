import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["Snowflake", "S3 Tables", "Iceberg REST", "Datatech News"],
    created_at: new Date("2025-03-30"),
    updated_at: new Date("2025-03-30"),

    // ----- quiz -----
    title: "SnowflakeからAWS S3 Tablesへの接続方法",
    question_jsx: <QuizQuestion />,
    options: {
      0: "SnowflakeからS3 Tablesに接続するには、SageMaker Lakehouse Iceberg RESTエンドポイントを使用する",
      1: "SnowflakeのCATALOG INTEGRATIONでは、ACCESS_DELEGATION_MODEにSTATIC_CREDENTIALSを指定する必要がある",
      2: "接続の認証には、SigV4認証が使用され、IAMロールをSnowflakeに指定する",
      3: "S3 TablesをSnowflakeから利用する場合、データは一度Snowflakeにコピーされてから処理される",
    },
    answers: [0, 2],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "Connect Snowflake to S3 Tables using the SageMaker Lakehouse Iceberg REST endpoint", url: "https://aws.amazon.com/blogs/storage/connect-snowflake-to-s3-tables-using-the-sagemaker-lakehouse-iceberg-rest-endpoint/" },
    ],
  });
  return quiz;
}

function QuizQuestion() {
  return (
    <div>
      <span>
        SnowflakeからAWS S3 Tablesに接続する方法に関する説明として、正しい選択肢を全て選んでください。
      </span>
    </div>
  );
}

const code = `CREATE CATALOG INTEGRATION glue_rest_catalog_int
  CATALOG_SOURCE = ICEBERG_REST
  TABLE_FORMAT = ICEBERG
  CATALOG_NAMESPACE = 'testnamespace'
  REST_CONFIG = (
    CATALOG_URI = 'https://glue.<region>.amazonaws.com/iceberg'
    CATALOG_API_TYPE = AWS_GLUE
    WAREHOUSE = '<account-id>:s3tablescatalog/s3tables-bucket'
    ACCESS_DELEGATION_MODE = VENDED_CREDENTIALS
  )
  REST_AUTHENTICATION = (
    TYPE = SIGV4
    SIGV4_IAM_ROLE = 'arn:aws:iam::<account-id>:role/snowflake_access_role'
    SIGV4_SIGNING_REGION = '<region>'
  )
  ENABLED = TRUE;
`;

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p>
        SnowflakeからAWS S3 Tablesに接続する方法について、正しい説明は以下の通りです：
      </p>
      <p className="py-2">
        <strong>接続アーキテクチャ</strong>：
        <ul className="list-disc pl-4">
          <li>SnowflakeからS3 Tablesに接続するには、SageMaker Lakehouse Iceberg RESTエンドポイントを利用します</li>
          <li>AWS Lake Formationが認証情報の提供（credential vending）を管理します</li>
          <li>S3 TablesはApache Icebergをネイティブサポートしており、相互運用性を向上させています</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>設定プロセス</strong>：
        <ul className="list-disc pl-4">
          <li>Snowflakeで外部カタログ統合（CATALOG INTEGRATION）を作成します</li>
          <li>接続にはSigV4認証を使用し、AWS IAMロールをSnowflakeに指定します</li>
          <li>ACCESS_DELEGATION_MODEには、一時的なセキュアなアクセストークンを使用するVENDED_CREDENTIALSを指定します</li>
        </ul>
      </p>
      <p className="py-2">
        <strong>実装例</strong>：Snowflake側での設定
      </p>
      <CodeBlock code={code}/>
      <p className="pt-4">
        この方法の大きな利点は、データを複製せずに直接S3 Tablesのデータにアクセスできることです。
        Snowflakeは直接S3 Tablesに対してクエリを実行するため、ETLプロセスの必要がなく、データの一貫性が保たれます。
        また、Lake Formationによるアクセス制御も活用できます。
      </p>
      <p className="pt-2">
        現在（2025年3月時点）、Snowflakeでの認証情報提供機能はプレビュー段階であり、外部カタログは読み取り専用モードで提供されています。
        この機能の範囲は将来変更される可能性があります。
      </p>
    </div>
  );
} 
