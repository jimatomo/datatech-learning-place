import { Quiz, generateQuizId, generateFilePath } from "@/contents/quiz";
import { CodeBlock } from "@/components/ui/code-block";

export default function QuizContent() {
  const quiz = new Quiz({
    // ----- metadata -----
    id: generateQuizId(import.meta.url),
    file_path: generateFilePath(import.meta.url),
    author: "assistant",
    author_url: "",
    tags: ["AWS CDK", "プロジェクト構造", "クラウドインフラ"],
    created_at: new Date("2025-08-14"),
    updated_at: new Date("2025-08-14"),

    // ----- quiz -----
    title: "AWS CDKプロジェクトの基本構造",
    question_jsx: <QuizQuestion />,
    options: {
      0: "プロジェクトの依存関係を管理する",
      1: "AWS CDK CLIにアプリの実行方法に関する指示を提供する",
      2: "プロジェクトのテスト設定を定義する",
      3: "AWSリソースの定義を格納する",
    },
    answers: [1],
    explanation_jsx: <QuizExplanation />,
    references: [
      { title: "AWS CDK プロジェクト - AWS CDK v2 デベロッパーガイド", url: "https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/projects.html" },
      { title: "AWS CDK Getting Started", url: "https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html" },
    ],
  });

  return quiz.render();
}

function QuizQuestion() {
  return (
    <div className="space-y-4">
      <p className="text-lg">
        AWS CDKプロジェクトにおいて、<code className="bg-gray-100 px-2 py-1 rounded">cdk.json</code>ファイルの主な役割は何ですか？
      </p>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>ヒント:</strong> <code>cdk.json</code>は、AWS CDKプロジェクトの設定に関する重要なファイルです。
        </p>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          AWS CDKプロジェクトを<code>cdk init</code>コマンドで初期化した際に作成される
          <code className="bg-gray-100 px-1 py-0.5 rounded mx-1">cdk.json</code>
          ファイルについて考えてみましょう。
        </p>
      </div>
    </div>
  );
}

function QuizExplanation() {
  return (
    <div className="space-y-4">
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">正解: AWS CDK CLIにアプリの実行方法に関する指示を提供する</h3>
        <p className="text-green-700">
          <code>cdk.json</code>ファイルは、AWS CDKプロジェクトの設定ファイルとして機能し、
          AWS CDK CLIにアプリケーションの実行方法を指示する重要な役割を果たします。
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold">cdk.jsonファイルの詳細:</h4>
        
        <div className="bg-gray-50 p-3 rounded">
          <h5 className="font-medium mb-2">基本的な構造:</h5>
          <CodeBlock language="json" code={`{
  "app": "npx ts-node --prefer-ts-exts bin/my-app.ts",
  "watch": {
    "include": [
      "**"
    ],
    "exclude": [
      "README.md",
      "cdk*.json",
      "**/*.d.ts",
      "**/*.js",
      "tsconfig.json",
      "package*.json",
      "yarn.lock",
      "node_modules",
      "test"
    ]
  },
  "context": {
    "@aws-cdk/core:enableStackNameDuplicates": true,
    "aws-cdk:enableDiffNoFail": true
  }
}`} />
        </div>

        <div>
          <h5 className="font-medium mb-2">主要な設定項目:</h5>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><code>app</code>: CDKアプリケーションを実行するためのコマンド</li>
            <li><code>watch</code>: <code>cdk watch</code>コマンドの監視設定</li>
            <li><code>context</code>: CDKの動作を制御するフィーチャーフラグ</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-3 rounded">
          <h5 className="font-medium text-blue-800 mb-2">AWS CDKプロジェクトの基本構造:</h5>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
            <li><code>bin/</code>: アプリケーションのエントリーポイント</li>
            <li><code>lib/</code>: スタックとコンストラクトの定義</li>
            <li><code>test/</code>: テストファイル</li>
            <li><code>cdk.json</code>: CDK設定ファイル</li>
            <li><code>package.json</code>: Node.jsの依存関係管理（TypeScript/JavaScript）</li>
          </ul>
        </div>
      </div>
    </div>
  );
}