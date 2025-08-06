import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "jimatomo",
    author_url: "https://github.com/jimatomo",
    tags: ["AWS", "CDK", "Infrastructure", "Data Modeling"],
    created_at: new Date("2025-08-07"),
    updated_at: new Date("2025-08-07"),

    // ----- quiz -----
    title: "AWS CDKの基本概念",
    question_jsx: <QuizQuestion />,
    options: { 
      0: "AWS CDKはAWSリソースをコードで定義・管理するためのフレームワークです",
      1: "AWS CDKは設定ファイル（YAML/JSON）でインフラを管理するツールです",
      2: "AWS CDKはAWSのWebコンソールを自動化するツールです",
      3: "AWS CDKはAWSの課金情報を管理するためのサービスです",
    },
    answers: [0],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "AWS CDK Developer Guide", url: "https://docs.aws.amazon.com/cdk/v2/guide/home.html" },
      { title: "AWS CDK API Reference", url: "https://docs.aws.amazon.com/cdk/api/v2/" }
    ],
  });
  return quiz;
}

const cdkCode = `import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Bucket, BucketEncryption, BlockPublicAccess } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // セキュアなS3バケットを作成
    new Bucket(this, 'MyBucket', {
      bucketName: 'my-example-bucket-12345', // 一意な名前
      versioned: true,
      encryption: BucketEncryption.S3_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY, // 開発環境用
    });
  }
}`;

function QuizQuestion() {
  return (
    <div>
      <p>AWS CDKについて正しい説明を選択してください。</p>
      <p className="pb-4">以下はAWS CDKで作成したスタックの例です：</p>
      <CodeBlock code={cdkCode} showLineNumbers={true} />
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="text-xs md:text-sm">
      <p><strong>正解の説明：</strong></p>
      <p>AWS CDK（Cloud Development Kit）はAWSリソースをコードで定義・管理するためのフレームワークです。主な特徴は以下の通りです：</p>
      <ul className="list-disc pl-4 py-2">
        <li><strong>プログラミング言語対応</strong>：TypeScript、JavaScript、Python、Java、C#、Goなどの言語でインフラを記述できます</li>
        <li><strong>高レベルな抽象化</strong>：Constructsという概念を使用してAWSリソースを組み合わせて構築できます</li>
        <li><strong>CloudFormationとの統合</strong>：最終的にはCloudFormationテンプレートに変換されてデプロイされます</li>
        <li><strong>再利用性</strong>：コードとしてインフラを管理するため、バージョン管理や再利用が容易です</li>
      </ul>
      
      <p className="mt-4"><strong>誤った選択肢について：</strong></p>
      <ul className="list-disc pl-4 py-2">
        <li><span className="text-red-600">設定ファイルでインフラを管理するツール</span>：これはTerraformやCloudFormationの説明です。CDKはプログラミング言語でインフラを記述します</li>
        <li><span className="text-red-600">Webコンソールを自動化するツール</span>：これはAWS CLIやSDKの機能に近い説明です</li>
        <li><span className="text-red-600">課金情報を管理するサービス</span>：これはAWS Cost ExplorerやAWS Budgetsなどの説明です</li>
      </ul>
    </div>
  );
}