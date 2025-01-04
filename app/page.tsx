import { ContentCard } from "@/components/ui/content-card"

export default function Home() {
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight">
        Datatech Learning Place (alpha)
      </h1>
      <div className="flex flex-col gap-2 md:text-base text-sm">
        <p>
          このサイトは、データエンジニアリングに関する学習を目的として作成されたサイトです。
          今後コンテンツを追加予定です。
        </p>
        <ul className="list-disc pl-6">
          <li>ユーザの認証機能（学習状況をクラウド側に保存できるようにする）</li>
          <li>学習の進捗を分析するダッシュボード機能</li>
          <li>データアプリケーションを一から構築するテキスト</li>
          <li>広告枠の募集（個別問い合わせ）</li>
            <li>組織管理機能（有償予定）</li>
        </ul>
      </div>
      <div className="flex flex-col gap-2 pt-8">
        <h2 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight">
          コンテンツ
        </h2>
        <div className="flex flex-col lg:flex-row gap-2">
          <ContentCard 
            title="Quiz"
            description="データ基盤に関するクイズ"
            imageSrc="/quiz_card.jpg"
            href="/quiz"
          />
        </div>
      </div>
    </div>
  );
}
