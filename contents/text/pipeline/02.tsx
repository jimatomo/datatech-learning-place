import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExternalLinkIcon, CheckCircleIcon } from "lucide-react"

export default function TextContents() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Chapter 2: Snowflake環境のセットアップ</h1>

      <p className="mb-4">
        この章では、データパイプラインの中核となるデータウェアハウス「Snowflake」のセットアップを行います。
        無料トライアルアカウントを作成し、基本的な操作に慣れていきましょう。
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">主な学習内容</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Snowflake無料トライアルアカウントの作成</li>
          <li>Snowsight (新UI) の基本操作</li>
          <li>データベース、スキーマ、ウェアハウスの作成</li>
          <li>サンプルデータのロードとクエリ実行</li>
        </ul>
      </div>

      <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mb-6">
        <CheckCircleIcon className="h-5 w-5 text-blue-600" />
        <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">Snowflakeとは？</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Snowflakeは、クラウドネイティブに設計されたSaaS型のデータウェアハウスです。
          コンピューティングとストレージが分離しており、高いスケーラビリティと柔軟性を誇ります。
          SQLで操作できるため、多くのエンジニアやアナリストにとって学習コストが低いのが特徴です。
        </AlertDescription>
      </Alert>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">1. アカウント作成</h3>
        <p className="mb-3">
          まずは公式サイトから30日間の無料トライアルにサインアップします。
          クレジットカードの登録は不要です。
        </p>
        <a
          href="https://signup.snowflake.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Snowflake 無料トライアル <ExternalLinkIcon className="h-4 w-4" />
        </a>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          プラットフォームは「AWS」、リージョンは「Asia Pacific (Tokyo)」を選択することをおすすめします。
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">2. Snowsightの確認</h3>
        <p className="mb-3">
          アカウント作成後、Snowsightと呼ばれる新しいWebインターフェースにログインします。
          左側のメニューから「Worksheets」を開き、SQLクエリを実行できることを確認しましょう。
        </p>
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-sm">
          <pre className="font-mono">
            <code>
              {`-- バージョン確認\nSELECT CURRENT_VERSION();\n\n-- 現在のウェアハウス、DB、スキーマの確認\nSELECT CURRENT_WAREHOUSE(), CURRENT_DATABASE(), CURRENT_SCHEMA();`}
            </code>
          </pre>
        </div>
        <p className="mt-4">
          次章では、このSnowflake環境にdbtから接続し、最初のデータモデルを構築していきます。
        </p>
      </div>

      {/* ページネーション */}
      <div className="mt-8 flex justify-between items-center">
        <div className="w-1/3">
          <a href="/text/pipeline/01" className="inline-flex items-center gap-2 px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
            ← 前のチャプターへ
          </a>
        </div>
        <div className="w-1/3 text-center">
          <a href="/text/pipeline" className="inline-flex items-center gap-2 px-6 py-2 font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition">
            トップへ戻る
          </a>
        </div>
        <div className="w-1/3 text-right">
          <a href="/text/pipeline/03" className="inline-flex items-center gap-2 px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
            次のチャプターへ進む →
          </a>
        </div>
      </div>
    </div>
  );
}