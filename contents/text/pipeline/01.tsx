import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table"
import { RocketIcon, TargetIcon, CheckCircleIcon, MapIcon, LifeBuoyIcon, PackageCheckIcon, WorkflowIcon, ScalingIcon } from "lucide-react"

export default function TextContents() {
  return (
    <div className="w-full">
      {/* イントロダクション */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-8 rounded-lg mb-8 text-center shadow-lg">
        <div className="flex justify-center items-center mb-4">
          <RocketIcon className="h-12 w-12 text-blue-600 animate-pulse" />
        </div>
        <h1 className="text-3xl font-extrabold text-blue-900 dark:text-blue-100 mb-2">
          データエンジニアリング実践入門
        </h1>
        <p className="text-lg text-blue-800 dark:text-blue-200 font-medium">
          ゼロから学ぶ、モダンなデータパイプライン構築
        </p>
      </div>

      {/* このテキストで得られること */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <PackageCheckIcon className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-bold">このテキストで習得できるスキルセット</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
            <p>モダンなデータ基盤の全体像を設計・構築する能力</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
            <p>dbtとSnowflakeを用いた実践的なデータモデリング技術</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
            <p>DockerとGitHub ActionsによるCI/CDパイプラインの実装スキル</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
            <p>AWSサーバーレスサービスを活用したコスト効率の良いインフラ運用スキル</p>
          </div>
        </div>
      </div>

      <div className="text-base leading-[2.0] pb-2">
        {/* なぜデータエンジニアリングなのか？ */}
        <div className="bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start gap-4">
            <TargetIcon className="h-8 w-8 text-yellow-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                なぜデータエンジニアリングは「総合格闘技」と称されるのか？
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300">
                それは、インフラ設計からデータフローの自動化(CI/CD)、品質保証(Quality Assurance)まで、幅広い技術領域をカバーするからです。
                この多角的なスキルセットは、市場価値の高いエンジニアへと成長するための重要な要素となります。
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 mt-3 font-semibold">
                ご安心ください。このテキストが、体系的なスキル習得のための確かなロードマップとなります。
              </p>
            </div>
          </div>
        </div>

        <p className="pb-4">
          広大なデータエンジニアリングの技術領域を効率的に学ぶには、まず全体の「設計図」を理解することが不可欠です。
          このテキストは、データパイプライン構築の全体像を示し、各技術がどのように連携するのかを明確に示します。
        </p>
        <p className="pb-4">
          インフラ構築、DevOps、品質管理といった各技術要素が、最終的にどのように一つの「価値あるデータアプリケーション」として結実するのか。
          その一連のプロセスをハンズオンで体験することで、断片的な知識が繋がり、実践的なスキルとして定着します。
        </p>

        {/* 注意事項 */}
        <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 my-6">
          <LifeBuoyIcon className="h-5 w-5 text-blue-600" />
          <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">学習の心構え</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            このテキストは、中級レベルへのステップアップを目指すための標準的なアプローチを提示します。しかし、これが唯一の正解ではありません。
            実際のプロジェクトでは、より複雑な要件に対応するため、常に新しい技術や知識が求められます。
            本テキストで得た基礎を土台に、継続的に学び、自身の技術を磨き続けてください。
          </AlertDescription>
        </Alert>

        {/* 全体像 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MapIcon className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-bold">構築するデータパイプラインの全体像</h2>
          </div>
          <p className="pb-4">
            このテキストでは、複数の技術を組み合わせ、実用的なデータパイプラインを構築します。
            各技術がコンポーネントとして連携し、一つのシステムを形成する流れを理解しましょう。
          </p>
          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 text-sm">
            <p className="pb-2"><strong>入力データ (例: 家計簿CSV)</strong></p>
            <p className="pl-4 pb-1">↓ (AWS S3にアップロード)</p>
            <p className="pb-2"><strong>データレイク (S3)</strong>: 生データの集約・保管</p>
            <p className="pl-4 pb-1">↓ (AWS Step Functions & ECS on Fargateでdbtジョブを実行)</p>
            <p className="pb-2"><strong>データ変換 (dbt)</strong>: データの構造化・クレンジング・集計</p>
            <p className="pl-4 pb-1">↓ (変換結果をSnowflakeにロード)</p>
            <p className="pb-2"><strong>データウェアハウス (Snowflake)</strong>: 分析用に最適化されたデータの格納</p>
            <p className="pl-4 pb-1">↓ (BIツールなどで接続・可視化)</p>
            <p><strong>データ活用 (可視化・分析)</strong></p>
            <p className="pt-4 text-xs text-gray-600 dark:text-gray-400">
              ※ この一連のプロセスは<strong>GitHub Actions</strong>によって自動化され、<strong>Docker</strong>によって実行環境の再現性が保証されます。
            </p>
          </div>
        </div>


        {/* 取り扱う技術 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ScalingIcon className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-bold">本テキストで扱う主要技術</h2>
          </div>
          <p className="mb-4">
            これらのモダンなツールを組み合わせ、効率的で信頼性の高いデータ基盤を構築します。
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>技術名</TableHead>
                <TableHead>カテゴリ</TableHead>
                <TableHead>システムにおける役割</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Snowflake</TableCell>
                <TableCell>データウェアハウス</TableCell>
                <TableCell>データ分析の中核を担う、スケーラブルなクラウドDWH</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">dbt</TableCell>
                <TableCell>データ変換</TableCell>
                <TableCell>SQLベースでデータ変換処理を体系化・品質管理するフレームワーク</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Docker</TableCell>
                <TableCell>コンテナ仮想化</TableCell>
                <TableCell>環境差異をなくし、再現性を担保するコンテナ実行環境</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">GitHub Actions</TableCell>
                <TableCell>CI/CD</TableCell>
                <TableCell>テストやデプロイのプロセスを自動化するCI/CDプラットフォーム</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">AWS Serverless</TableCell>
                <TableCell>クラウドインフラ</TableCell>
                <TableCell>サーバー管理不要で、コスト効率の良いインフラを実現するサービス群</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        {/* 各技術の詳細 */}
        <div>
          <h3 className="text-lg font-bold pt-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700">主要技術コンポーネント</h3>
          <p className="pt-2 pb-4">各技術の役割と特徴を簡潔に解説します。</p>

          <h4 className="text-base font-semibold pt-4 pb-2">Snowflake: クラウドデータウェアハウス</h4>
          <p className="pb-2 text-sm">
            データ基盤の心臓部。膨大なデータを高速に処理し、安全に保管するクラウドネイティブなDWHです。
            データエンジニアとして最初に習得すべき最重要プラットフォームの一つです。
          </p>

          <h4 className="text-base font-semibold pt-4 pb-2">dbt: データ変換フレームワーク</h4>
          <p className="pb-2 text-sm">
            SQLをモジュール化して管理し、信頼性の高いデータモデルを構築します。
            テスト機能による品質保証や、ドキュメント自動生成など、データ変換プロセス全体を効率化します。
          </p>

          <h4 className="text-base font-semibold pt-4 pb-2">Docker: コンテナ仮想化技術</h4>
          <p className="pb-2 text-sm">
            「開発環境では動いたのに、本番環境で動かない」といった環境差異の問題を解決します。
            アプリケーションの実行に必要な環境を「コンテナ」としてパッケージ化し、ポータビリティと再現性を高めます。
          </p>

          <h4 className="text-base font-semibold pt-4 pb-2">GitHub Actions: CI/CDプラットフォーム</h4>
          <p className="pb-2 text-sm">
            GitHubリポジトリと緊密に連携し、テスト、ビルド、デプロイといった一連のワークフローを自動化します。
            手動作業を削減し、迅速で信頼性の高いリリースサイクルを実現します。
          </p>

          <h4 className="text-base font-semibold pt-4 pb-2">AWS Serverless: サーバーレスコンピューティング</h4>
          <p className="pb-2 text-sm">
            サーバーのプロビジョニングや管理をAWSに任せ、コードの実行に集中できるサービス群です。S3やECS on Fargateなどを活用し、スケーラブルでコスト効率の高いインフラを構築します。
          </p>
        </div>

        {/* この先の進め方 */}
        <div className="mt-12 p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <WorkflowIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">次のステップ: 実践へ</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            次章から、実際に家計簿データを用いてパイプライン構築を開始します。
            まずはローカルのDocker環境でdbtを実行し、Snowflakeに最初のデータモデルをデプロイする手順から始めます。
            理論と実践を繋げ、着実にスキルを身につけていきましょう。
          </p>
        </div>

        {/* ページネーション */}
        <div className="mt-8 flex justify-between items-center">
          <div className="w-1/3"></div>
          <div className="w-1/3 text-center">
            <a href="/text/pipeline" className="inline-flex items-center gap-2 px-6 py-2 font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition">
              トップへ戻る
            </a>
          </div>
          <div className="w-1/3 text-right">
            <a href="/text/pipeline/02" className="inline-flex items-center gap-2 px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
              次のチャプターへ進む →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

